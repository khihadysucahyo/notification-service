import { Test, TestingModule } from '@nestjs/testing';
import { UiChannelService } from './ui-channel.service';
import { NotificationRepository } from '../../notification/notification.repository';
import { CHANNEL_TYPES } from '../channels.constants';
import { NOTIFICATION_TYPES } from '../../notification-config';

describe('UiChannelService', () => {
  let service: UiChannelService;
  let notificationRepository: NotificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UiChannelService,
        {
          provide: NotificationRepository,
          useValue: {
            createNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UiChannelService>(UiChannelService);
    notificationRepository = module.get<NotificationRepository>(NotificationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct channel type', () => {
    expect(service.getChannelType()).toBe(CHANNEL_TYPES.UI);
  });

  it('should send notification and call repository', () => {
    const payload = {
      companyId: 'company-123',
      userId: 'user-456',
      notificationType: NOTIFICATION_TYPES.LEAVE_BALANCE_REMINDER,
    };

    const result = service.sendNotification(payload);

    expect(result).toBe('Notification sent to UI');

    expect(notificationRepository.createNotification).toHaveBeenCalledWith({
      companyId: payload.companyId,
      userId: payload.userId,
      notificationType: payload.notificationType,
      channelType: CHANNEL_TYPES.UI,
    });
  });
});
