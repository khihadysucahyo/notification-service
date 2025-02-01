import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { ChannelFactoryService } from '../channel-factory/channel-factory.service';
import { UiChannelService } from '../channels/ui-channel/ui-channel.service';
import { EmailChannelService } from '../channels/email-channel/email-channel.service';
import { NotificationRepository } from './notification.repository';
import { CompanyService } from '../../company/company.service';
import { UserService } from '../../user/user.service';
import { INotificationChannel } from '../../shared/interfaces/notification-channels.interface';
import { NOTIFICATION_TYPES } from '../notification-config';
import { CHANNEL_TYPES } from '../channels/channels.constants';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let channelFactoryService: ChannelFactoryService;
  let companyService: CompanyService;
  let userService: UserService;

  const mockUiChannelService: Partial<INotificationChannel> = {
    getChannelType: jest.fn(),
    sendNotification: jest.fn(),
  };

  const mockEmailChannelService: Partial<INotificationChannel> = {
    getChannelType: jest.fn(),
    sendNotification: jest.fn(),
  };

  const mockNotificationRepository = {
    createNotification: jest.fn(),
    getNotificationsByUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        ChannelFactoryService,
        {
          provide: UiChannelService,
          useValue: mockUiChannelService,
        },
        {
          provide: EmailChannelService,
          useValue: mockEmailChannelService,
        },
        CompanyService,
        UserService,
        NotificationRepository,
        {
          provide: NotificationRepository,
          useValue: mockNotificationRepository,
        },
      ],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
    channelFactoryService = module.get<ChannelFactoryService>(ChannelFactoryService);
    companyService = module.get<CompanyService>(CompanyService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('should send notification through UI channel for leave-balance-reminder', async () => {
    const notificationType = NOTIFICATION_TYPES.LEAVE_BALANCE_REMINDER;

    const mockCompanySubscriptions = { [CHANNEL_TYPES.UI]: true };
    const mockUserSubscriptions = { [CHANNEL_TYPES.UI]: true };

    jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([mockUiChannelService as INotificationChannel]);
    jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
    jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  
    jest.spyOn(mockUiChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.UI);

    await notificationService.sendNotification('company-a', 'user-a', notificationType);

    expect(channelFactoryService.getChannels).toHaveBeenCalledWith(notificationType);
    expect(companyService.getAllSubscriptions).toHaveBeenCalledWith('company-a');
    expect(userService.getAllSubscriptions).toHaveBeenCalledWith('user-a');

    expect(mockEmailChannelService.sendNotification).not.toHaveBeenCalled();
    expect(mockUiChannelService.sendNotification).toHaveBeenCalledWith({
      companyId: 'company-a',
      userId: 'user-a',
      notificationType: notificationType,
    });
  });

  it('should send notification through Email channel for monthly-payslip', async () => {
    const notificationType = NOTIFICATION_TYPES.MONTHLY_PAYSLIP;

    const mockCompanySubscriptions = { [CHANNEL_TYPES.EMAIL]: true };
    const mockUserSubscriptions = { [CHANNEL_TYPES.EMAIL]: true };

    jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([mockEmailChannelService as INotificationChannel]);
    jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
    jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  
    jest.spyOn(mockEmailChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.EMAIL);

    await notificationService.sendNotification('company-a', 'user-a', notificationType);

    expect(channelFactoryService.getChannels).toHaveBeenCalledWith(notificationType);
    expect(companyService.getAllSubscriptions).toHaveBeenCalledWith('company-a');
    expect(userService.getAllSubscriptions).toHaveBeenCalledWith('user-a');

    expect(mockUiChannelService.sendNotification).not.toHaveBeenCalled();
    expect(mockEmailChannelService.sendNotification).toHaveBeenCalledWith({
      companyId: 'company-a',
      userId: 'user-a',
      notificationType: notificationType,
    });
  });

  it('should send notification through UI and Email channels for happy-birthday', async () => {
    const notificationType = NOTIFICATION_TYPES.HAPPY_BIRTHDAY;

    const mockCompanySubscriptions = { [CHANNEL_TYPES.UI]: true, [CHANNEL_TYPES.EMAIL]: true };
    const mockUserSubscriptions = { [CHANNEL_TYPES.UI]: true, [CHANNEL_TYPES.EMAIL]: true };

    jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([
      mockUiChannelService as INotificationChannel,
      mockEmailChannelService as INotificationChannel,
    ]);
    jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
    jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  
    jest.spyOn(mockUiChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.UI);
    jest.spyOn(mockEmailChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.EMAIL);

    await notificationService.sendNotification('company-a', 'user-a', notificationType);

    expect(channelFactoryService.getChannels).toHaveBeenCalledWith(notificationType);
    expect(companyService.getAllSubscriptions).toHaveBeenCalledWith('company-a');
    expect(userService.getAllSubscriptions).toHaveBeenCalledWith('user-a');

    expect(mockUiChannelService.sendNotification).toHaveBeenCalledWith({
      companyId: 'company-a',
      userId: 'user-a',
      notificationType: notificationType,
    });
    expect(mockEmailChannelService.sendNotification).toHaveBeenCalledWith({
      companyId: 'company-a',
      userId: 'user-a',
      notificationType: notificationType,
    });
  });

  it('should log skipped notification reason if company and user are not subscribed to any channel', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const notificationType = NOTIFICATION_TYPES.HAPPY_BIRTHDAY;

    const mockCompanySubscriptions = {};
    const mockUserSubscriptions = {};

    jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([
      mockUiChannelService as INotificationChannel,
      mockEmailChannelService as INotificationChannel,
    ]);
    jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
    jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  

    await notificationService.sendNotification('company-a', 'user-a', notificationType);

    expect(channelFactoryService.getChannels).toHaveBeenCalledWith(notificationType);
    expect(companyService.getAllSubscriptions).toHaveBeenCalledWith('company-a');
    expect(userService.getAllSubscriptions).toHaveBeenCalledWith('user-a');

    expect(mockUiChannelService.sendNotification).not.toHaveBeenCalled();
    expect(mockEmailChannelService.sendNotification).not.toHaveBeenCalled();

    expect(logSpy).toHaveBeenCalledWith(
      `Skipping notification for ${notificationType} to ui (Company: company-a, User: user-a). Reason: Company not subscribed`
    );
    expect(logSpy).toHaveBeenCalledWith(
      `Skipping notification for ${notificationType} to email (Company: company-a, User: user-a). Reason: Company not subscribed`
    );
  });
});