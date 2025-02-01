import { Injectable } from '@nestjs/common';
import { ChannelFactoryService } from '../channel-factory/channel-factory.service';
import { CompanyService } from '../../company/company.service';
import { UserService } from '../../user/user.service';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
    constructor(
        private readonly channelFactory: ChannelFactoryService,
        private readonly companyService: CompanyService,
        private readonly userService: UserService,
        private readonly notificationRepository: NotificationRepository,
    ) {}

    private isChannelSubscribed(subscriptions: Record<string, boolean> | undefined, channelType: string): boolean {
        return !!(subscriptions && subscriptions[channelType]);
    }

    private logSkippedNotificationReason(
        companyId: string,
        userId: string,
        notificationType: string,
        channelType: string,
        companySubscriptions: Record<string, boolean> | undefined,
    ) {
        const reason = this.isChannelSubscribed(companySubscriptions, channelType)
            ? 'User not subscribed'
            : 'Company not subscribed';

        console.log(
            `Skipping notification for ${notificationType} to ${channelType} (Company: ${companyId}, User: ${userId}). ` +
            `Reason: ${reason}`
        );
    }

    async sendNotification(
        companyId: string,
        userId: string,
        notificationType: string,
    ) {
        const channels = this.channelFactory.getChannels(notificationType);

        const [companySubscriptions, userSubscriptions] = await Promise.all([
            this.companyService.getAllSubscriptions(companyId),
            this.userService.getAllSubscriptions(userId),
        ]);

        channels.forEach((channel) => {
            const channelType = channel.getChannelType();
            const companySubscribed = this.isChannelSubscribed(companySubscriptions, channelType);
            const userSubscribed = this.isChannelSubscribed(userSubscriptions, channelType);
    
            if (companySubscribed || userSubscribed) {
                channel.sendNotification({ companyId, userId, notificationType });
            } else {
                this.logSkippedNotificationReason(companyId, userId, notificationType, channelType, companySubscriptions);
            }
        });
    }

    getUINotificationsByUser(userId: string) {
        return this.notificationRepository.getNotificationsByUser(userId);
    }
}
