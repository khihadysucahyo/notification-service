import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

describe('NotificationController', () => {
  let controller: NotificationController;
  let notificationService: NotificationService;

  const mockNotificationService = {
    sendNotification: jest.fn(),
    getUINotificationsByUser: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        }
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendNotification', () => {
    it('should successfully send notification', async () => {
      const dto = {
        companyId: 'company-1',
        userId: 'user-1',
        notificationType: 'happy-birthday'
      };

      mockNotificationService.sendNotification.mockResolvedValue(undefined);

      const result = await controller.sendNotification(dto);

      expect(result).toEqual({ message: 'Notification sent successfully.' });
      expect(mockNotificationService.sendNotification).toHaveBeenCalledWith(
        dto.companyId,
        dto.userId,
        dto.notificationType
      );
    });

    it('should handle errors when sending notification', async () => {
      const dto = {
        companyId: 'company-1',
        userId: 'user-1',
        notificationType: 'happy-birthday'
      };

      const error = new Error('Test error');
      mockNotificationService.sendNotification.mockRejectedValue(error);

      const result = await controller.sendNotification(dto);

      expect(result).toEqual({
        message: 'Failed to send notification.',
        error: error.message
      });
    });
  });

  describe('getNotifications', () => {
    it('should successfully get notifications', async () => {
      const userId = 'user-1';
      const mockNotifications = [
        { id: 1, message: 'test' }
      ];

      mockNotificationService.getUINotificationsByUser.mockResolvedValue(mockNotifications);

      const result = await controller.getNotifications(userId);

      expect(result).toEqual({
        success: true,
        data: mockNotifications,
        message: 'Notifications retrieved successfully'
      });
      expect(mockNotificationService.getUINotificationsByUser).toHaveBeenCalledWith(userId);
    });

    it('should handle errors when getting notifications', async () => {
      const userId = 'user-1';
      const error = new Error('Test error');

      mockNotificationService.getUINotificationsByUser.mockRejectedValue(error);

      const result = await controller.getNotifications(userId);

      expect(result).toEqual({
        success: false,
        data: null,
        message: 'Failed to get notifications',
        error: error.message
      });
    });
  });
});
