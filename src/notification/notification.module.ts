import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './notification/notification.schema';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { UiChannelService } from './channels/ui-channel/ui-channel.service';
import { EmailChannelService } from './channels/email-channel/email-channel.service';
import { ChannelFactoryService } from './channel-factory/channel-factory.service';
import { NotificationRepository } from './notification/notification.repository';
import { TemplateModule } from './templates';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
    TemplateModule,
    CompanyModule,
    UserModule
  ],
  providers: [
    NotificationService,
    UiChannelService,
    EmailChannelService,
    ChannelFactoryService,
    NotificationRepository
  ],
  controllers: [NotificationController],
  exports: [NotificationService]
})
export class NotificationModule {}
