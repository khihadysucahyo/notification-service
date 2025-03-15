import { Controller, Body, Param, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    @Post('send')
    async sendNotification(
        @Body() sendNotificationDto: SendNotificationDto
    ) {
        try {
            await this.notificationService.sendNotification(
                sendNotificationDto.companyId,
                sendNotificationDto.userId,
                sendNotificationDto.notificationType
            );
            return { message: 'Notification sent successfully.' };
        } catch (error) {
            return { message: 'Failed to send notification.', error: error.message };
        }
    }

    @Get('users/:userId/ui')
    async getNotifications(@Param('userId') userId: string) {
        try {
            const notifications = await this.notificationService.getUINotificationsByUser(userId);
            return {
                success: true,
                data: notifications,
                message: 'Notifications retrieved successfully'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'Failed to get notifications',
                error: error.message
            };
        }
    }
}
