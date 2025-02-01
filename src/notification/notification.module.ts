import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './notification/notification.schema';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { UiChannelService } from './channels/ui-channel/ui-channel.service';
import { EmailChannelService } from './channels/email-channel/email-channel.service';
import { ChannelFactoryService } from './channel-factory/channel-factory.service';
import { CompanyService } from '../company/company.service';
import { UserService } from '../user/user.service';
import { NotificationRepository } from './notification/notification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
  ],
  providers: [
    NotificationService,
    UiChannelService,
    EmailChannelService,
    ChannelFactoryService,
    CompanyService,
    UserService,
    NotificationRepository,
  ],
  controllers: [NotificationController]
})
export class NotificationModule {}
