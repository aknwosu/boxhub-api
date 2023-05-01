import mongoose from 'mongoose';
import dayjs from 'dayjs';

export interface OrdersInterface {
  id: string;
  created: string;
  status: Status;
  type: string;
  customer: string;
  sku: string;
  photo: string;
  condition: string;
  size: string;
  origin_address: string;
  shipping_address: string;
};

export enum Status {
  Pending = 'pending',
  InProgress = 'in-progress',
  Delivered = 'delivered',
}

export enum Condition {
  CargoWorthy = 'cargo-worthy',
  InProgress = 'new',
  WindWatertight = 'wind-watertight',
}

const orderSchema = new mongoose.Schema({
  id: {
    required: false,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  created: {
    required: true,
    type: String,
    default: dayjs().format('YYYY-MM-DD'),
  },
  status: {
    required: true,
    type: String,
    enum: Status,
  },
  customer: {
    required: true,
    type: String,
  },
  sku: {
    type: String,
    required: true,
  },
  photo: {
    required: true,
    type: String,
  },
  condition: {
    required: true,
    enum: Condition,
    type: String,
  },

  size: {
    required: true,
    type: String,
  },
  origin_address: {
    required: true,
    type: String,
  },
  shipping_address: {
    required: true,
    type: String,
  },
});
const Order = mongoose.model('Order', orderSchema);
export default Order;
