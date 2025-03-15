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
import { TemplateService } from '../templates';
import { Notification } from './notification.schema';

describe('NotificationService', () => {
  // Service declarations for testing
  let notificationService: NotificationService;
  let channelFactoryService: ChannelFactoryService;
  let companyService: CompanyService;
  let userService: UserService;
  let templateService: TemplateService;
  let notificationRepository: NotificationRepository;

  // Mock for UI channel (in-app notifications)
  const mockUiChannelService: Partial<INotificationChannel> = {
    getChannelType: jest.fn(),
    sendNotification: jest.fn(),
  };

  // Mock for Email channel
  const mockEmailChannelService: Partial<INotificationChannel> = {
    getChannelType: jest.fn(),
    sendNotification: jest.fn(),
  };

  // Mock for notification repository
  const mockNotificationRepository = {
    createNotification: jest.fn(),
    getNotificationsByUser: jest.fn(),
  };

  // Sample user data
  const mockUser = {
    id: 'user-1',
    name: 'Alice',
    subscriptions: { ui: true, email: true }
  };

  // Sample company data
  const mockCompany = {
    id: 'company-1',
    name: 'ABC Corp',
    subscriptions: { ui: true, email: true }
  };

  // Sample notification template
  const mockTemplate = {
    email: {
      subject: 'Test Subject',
      content: 'Test Content'
    },
    ui: {
      content: 'Test UI Content'
    }
  };

  // Helper function to create mock notifications
  const createMockNotification = (data: Partial<Notification> = {}): Notification => {
    const notification = {
      companyId: 'company-1',
      userId: 'user-1',
      notificationType: NOTIFICATION_TYPES.HAPPY_BIRTHDAY,
      channelType: CHANNEL_TYPES.UI,
      createdAt: new Date(),
      ...data
    } as Notification;
    return notification;
  };

  // Setup before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: ChannelFactoryService,
          useValue: {
            getChannels: jest.fn()
          }
        },
        {
          provide: UiChannelService,
          useValue: mockUiChannelService,
        },
        {
          provide: EmailChannelService,
          useValue: mockEmailChannelService,
        },
        {
          provide: CompanyService,
          useValue: {
            getAllSubscriptions: jest.fn(),
            getCompanyData: jest.fn()
          }
        },
        {
          provide: UserService,
          useValue: {
            getAllSubscriptions: jest.fn(),
            getUserData: jest.fn()
          }
        },
        {
          provide: NotificationRepository,
          useValue: mockNotificationRepository,
        },
        {
          provide: TemplateService,
          useValue: {
            getCompiledTemplate: jest.fn()
          }
        }
      ],
    }).compile();

    // Initialize required services
    notificationService = module.get<NotificationService>(NotificationService);
    channelFactoryService = module.get<ChannelFactoryService>(ChannelFactoryService);
    companyService = module.get<CompanyService>(CompanyService);
    userService = module.get<UserService>(UserService);
    templateService = module.get<TemplateService>(TemplateService);
    notificationRepository = module.get<NotificationRepository>(NotificationRepository);
  });

  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Basic service initialization test
  it('should be properly initialized', () => {
    expect(notificationService).toBeDefined();
  });

  describe('Sending Notifications', () => {
    describe('Leave Balance Reminder Notification', () => {
      it('should successfully send UI notification when user and company are subscribed', async () => {
        const notificationType = NOTIFICATION_TYPES.LEAVE_BALANCE_REMINDER;
        const mockCompanySubscriptions = { [CHANNEL_TYPES.UI]: true };
        const mockUserSubscriptions = { [CHANNEL_TYPES.UI]: true };

        const mockLeaveBalanceTemplate = {
          ui: {
            content: 'Your leave balance reminder'
          },
          email: {
            subject: 'Leave Balance Reminder',
            content: 'Your leave balance reminder email'
          }
        };

        // Setup mocks
        jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([mockUiChannelService as INotificationChannel]);
        jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
        jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  
        jest.spyOn(mockUiChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.UI);
        jest.spyOn(templateService, 'getCompiledTemplate').mockResolvedValue(mockLeaveBalanceTemplate);

        // Execute test
        await notificationService.sendNotification('company-a', 'user-a', notificationType);

        // Verify results
        expect(templateService.getCompiledTemplate).toHaveBeenCalledWith(notificationType, 'company-a', 'user-a');
        expect(mockEmailChannelService.sendNotification).not.toHaveBeenCalled();
        expect(mockUiChannelService.sendNotification).toHaveBeenCalledWith({
          companyId: 'company-a',
          userId: 'user-a',
          notificationType: notificationType,
          template: mockLeaveBalanceTemplate.ui
        });
      });
    });

    describe('Monthly Payslip Notification', () => {
      it('should successfully send email notification when user and company are subscribed', async () => {
        const notificationType = NOTIFICATION_TYPES.MONTHLY_PAYSLIP;
        const mockCompanySubscriptions = { [CHANNEL_TYPES.EMAIL]: true };
        const mockUserSubscriptions = { [CHANNEL_TYPES.EMAIL]: true };

        const mockPayslipTemplate = {
          ui: {
            content: 'Your monthly payslip is ready'
          },
          email: {
            subject: 'Monthly Payslip',
            content: 'Your monthly payslip is ready. Please check the attachment.'
          }
        };

        // Setup mocks
        jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([mockEmailChannelService as INotificationChannel]);
        jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
        jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  
        jest.spyOn(mockEmailChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.EMAIL);
        jest.spyOn(templateService, 'getCompiledTemplate').mockResolvedValue(mockPayslipTemplate);

        // Execute test
        await notificationService.sendNotification('company-a', 'user-a', notificationType);

        // Verify results
        expect(templateService.getCompiledTemplate).toHaveBeenCalledWith(notificationType, 'company-a', 'user-a');
        expect(mockUiChannelService.sendNotification).not.toHaveBeenCalled();
        expect(mockEmailChannelService.sendNotification).toHaveBeenCalledWith({
          companyId: 'company-a',
          userId: 'user-a',
          notificationType: notificationType,
          template: mockPayslipTemplate.email
        });
      });
    });

    describe('Birthday Notification', () => {
      it('should successfully send both UI and Email notifications when user and company are subscribed to both', async () => {
        const notificationType = NOTIFICATION_TYPES.HAPPY_BIRTHDAY;
        const mockCompanySubscriptions = { [CHANNEL_TYPES.UI]: true, [CHANNEL_TYPES.EMAIL]: true };
        const mockUserSubscriptions = { [CHANNEL_TYPES.UI]: true, [CHANNEL_TYPES.EMAIL]: true };

        const mockBirthdayTemplate = {
          ui: {
            content: 'Happy Birthday!'
          },
          email: {
            subject: 'Happy Birthday!',
            content: 'Wishing you a wonderful birthday!'
          }
        };

        // Setup mocks
        jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([
          mockUiChannelService as INotificationChannel,
          mockEmailChannelService as INotificationChannel,
        ]);
        jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
        jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  
        jest.spyOn(mockUiChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.UI);
        jest.spyOn(mockEmailChannelService, 'getChannelType').mockReturnValue(CHANNEL_TYPES.EMAIL);
        jest.spyOn(templateService, 'getCompiledTemplate').mockResolvedValue(mockBirthdayTemplate);

        // Execute test
        await notificationService.sendNotification('company-a', 'user-a', notificationType);

        // Verify results
        expect(templateService.getCompiledTemplate).toHaveBeenCalledWith(notificationType, 'company-a', 'user-a');
        expect(mockUiChannelService.sendNotification).toHaveBeenCalledWith({
          companyId: 'company-a',
          userId: 'user-a',
          notificationType: notificationType,
          template: mockBirthdayTemplate.ui
        });
        expect(mockEmailChannelService.sendNotification).toHaveBeenCalledWith({
          companyId: 'company-a',
          userId: 'user-a',
          notificationType: notificationType,
          template: mockBirthdayTemplate.email
        });
      });

      it('should skip sending notifications and log reasons when user and company are not subscribed', async () => {
        const logSpy = jest.spyOn(console, 'log');
        const notificationType = NOTIFICATION_TYPES.HAPPY_BIRTHDAY;
        const mockCompanySubscriptions = {};
        const mockUserSubscriptions = {};

        // Setup mocks
        jest.spyOn(channelFactoryService, 'getChannels').mockReturnValue([
          mockUiChannelService as INotificationChannel,
          mockEmailChannelService as INotificationChannel,
        ]);
        jest.spyOn(companyService, 'getAllSubscriptions').mockResolvedValue(mockCompanySubscriptions);
        jest.spyOn(userService, 'getAllSubscriptions').mockResolvedValue(mockUserSubscriptions);  

        // Execute test
        await notificationService.sendNotification('company-a', 'user-a', notificationType);

        // Verify results
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
  });

  describe('Retrieving Notifications', () => {
    it('should successfully retrieve UI notifications for a specific user', async () => {
      const mockNotifications = [createMockNotification()];
      jest.spyOn(notificationRepository, 'getNotificationsByUser').mockResolvedValue(mockNotifications);

      const result = await notificationService.getUINotificationsByUser('user-1');

      expect(result).toEqual(mockNotifications);
      expect(notificationRepository.getNotificationsByUser).toHaveBeenCalledWith('user-1');
    });
  });
});