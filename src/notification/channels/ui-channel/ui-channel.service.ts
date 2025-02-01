import { Injectable } from '@nestjs/common';
import { INotificationChannel } from '../../../shared/interfaces/notification-channels.interface';
import { NotificationRepository } from '../../notification/notification.repository';
import { CHANNEL_TYPES } from '../channels.constants';

@Injectable()
export class UiChannelService implements INotificationChannel {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  getChannelType(): string {
    return CHANNEL_TYPES.UI;
  }

  sendNotification(payload: any): string {
    console.log('Sending UI Notification:', payload);

    this.notificationRepository.createNotification({
      companyId: payload.companyId,
      userId: payload.userId,
      notificationType: payload.notificationType,
      channelType: this.getChannelType(),
    });
  
    return 'Notification sent to UI';
  }
}
