import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
  ) {}

  async createNotification(payload: any): Promise<Notification> {
    const newNotification = new this.notificationModel(payload);
    return newNotification.save();
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return this.notificationModel.find({ userId }).exec();
  }
}
