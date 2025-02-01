import { Controller, Body, Param, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    @Post('send')
    async sendNotification(
        @Body('companyId') companyId: string,
        @Body('userId') userId: string,
        @Body('notificationType') notificationType: string
    ) {
        try {
            await this.notificationService.sendNotification(companyId, userId, notificationType);
            return { message: 'Notification sent successfully.' };
        } catch (error) {
            return { message: 'Failed to send notification.', error: error.message };
        }
    }

    @Get('users/:userId/ui')
    async getNotifications(
        @Param('userId') userId: string
    ) {
        try {
            return await this.notificationService.getUINotificationsByUser(userId);
        } catch (error) {
            return { message: 'Failed to get notifications.', error: error.message };
        }
    }
}
