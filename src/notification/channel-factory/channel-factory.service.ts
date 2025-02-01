import { Injectable } from '@nestjs/common';
import { INotificationChannel } from '../../shared/interfaces/notification-channels.interface';
import { UiChannelService } from '../channels/ui-channel/ui-channel.service';
import { EmailChannelService } from '../channels/email-channel/email-channel.service';
import { NOTIFICATION_CHANNELS } from '../notification-config';

@Injectable()
export class ChannelFactoryService {
    private readonly channelMap: Record<string, INotificationChannel>;

    constructor(
        private readonly uiChannelService: UiChannelService,
        private readonly emailChannelService: EmailChannelService,
    ) {
        this.channelMap = {
            ui: uiChannelService,
            email: emailChannelService,
        };
    }

    getChannels(type: string): INotificationChannel[] {
        const channelKeys = NOTIFICATION_CHANNELS[type];

        if (!channelKeys) {
            throw new Error(`Unsupported notification type: ${type}`);
        }

        return channelKeys.map((key) => {
            const channel = this.channelMap[key];

            if (!channel) {
                throw new Error(`Channel not found: ${key}`);
            }

            return channel;
        });
    }
}
