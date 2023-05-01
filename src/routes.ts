import { Request, Response } from 'express';
import { createOrder, getOrders, updateOrder } from './service';


export default (app) => {
  app.get('/', (_, res: Response) => {
    res.send('Connected to BH home');
  });

  app.get('/api/orders', async (req: Request, res: Response) => {
    getOrders(req, res);
  });

  app.post('/api/orders', async (req: Request, res: Response) => {
    createOrder(req, res)
  });

  app.put('/api/orders/:id', async (req: Request, res: Response) => {
    updateOrder(req, res)
  });
};
