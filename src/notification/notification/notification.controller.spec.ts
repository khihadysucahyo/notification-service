import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ChannelFactoryService } from '../channel-factory/channel-factory.service';
import { CompanyService } from '../../company/company.service';
import { UserService } from '../../user/user.service';
import { NotificationRepository } from '../notification/notification.repository';

describe('NotificationController', () => {
  let controller: NotificationController;
  let notificationService: NotificationService;

  const mockChannelFactoryService = { createChannel: jest.fn() };
  const mockCompanyService = {};
  const mockUserService = {};
  const mockNotificationRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        NotificationService,
        {
          provide: ChannelFactoryService,
          useValue: mockChannelFactoryService,
        },
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: NotificationRepository,
          useValue: mockNotificationRepository,
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(notificationService).toBeDefined();
  });
});
