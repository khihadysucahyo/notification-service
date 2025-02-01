import { Schema, Document } from 'mongoose';

export interface Notification extends Document {
  companyId: string;
  userId: string;
  notificationType: string;
  channelType: string;
  createdAt: Date;
}

export const NotificationSchema = new Schema<Notification>(
  {
    companyId: { type: String, required: true },
    userId: { type: String, required: true },
    notificationType: { type: String, required: true },
    channelType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'notifications',
  },
);
