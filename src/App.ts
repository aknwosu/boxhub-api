import express from 'express';
import { Server } from 'http';
import routes from './routes';
import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
const port = process.env.PORT || 8000;

export class App {
  public app: express.Application = express();
  public server?: Server;
  public database?: mongoose.Connection;

  public async start(): Promise<void> {
    dotEnv.config();
    this.app.use(morgan('tiny'));
    morgan(':method :url :status :res[content-length] - :response-time ms')

    await this.configureDb();
    this.app.use(cors());
    await this.configureServer();
    routes(this.app);
  }

  private async configureDb(): Promise<void> {
    const { MONGO_URI } = process.env;

    try {
      if (!MONGO_URI) {
        throw new Error('MONGODB_URI not set');
      }

      await mongoose.connect(MONGO_URI, {
        keepAlive: true,
      });
      this.database = mongoose.connection;
    } catch (err) {
      
      console.log({ err });
    }
  }

  private configureServer(): void {
    this.app.use(express.json({ type: 'application/json' }));
    this.app.use(express.urlencoded({ extended: false }));

    this.app.listen(port, () => {
      console.log('Server started on port ' + port);
    });
  }
}

export default new App();
