import dayjs from 'dayjs';
import { Request, Response } from 'express';
import Orders, { OrdersInterface } from './models';

export const getOrders = async (req: Request, res: Response) => {
    const queryParams = req.query;
      const filters: unknown = {};
      if (queryParams.status) filters['status'] = queryParams.status;
      if (queryParams.size) filters['size'] = queryParams.size;
      if (queryParams.condition) filters['condition'] = queryParams.condition;
      if (queryParams.type) filters['type'] = queryParams.type;

      try {
        const orders = await Orders.find(filters).sort({ created: -1 });

        return res.status(200).json(orders);
      } catch (error) {
        res.status(500).send(`Error: ${error}`);
      }
  }
  
  export const createOrder = async (req: Request, res: Response) => {
    const newOrder: OrdersInterface = req.body;
    newOrder.created = dayjs().format('YYYY-MM-DD');
    try {
      const exists = await Orders.findOne({ sku: newOrder.sku });
      if (exists) {
        return res.status(409).send('Already exists');
      }
      const order = await Orders.create(newOrder);
      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
  
  export const updateOrder = async (req: Request, res: Response) => {
    const newOrder: OrdersInterface = req.body;
    const id = req.params.id;
    try {
      const order = await Orders.findByIdAndUpdate({ _id: id }, newOrder, {
        new: true,
      });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
