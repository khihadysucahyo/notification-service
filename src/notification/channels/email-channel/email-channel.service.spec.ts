import { Test, TestingModule } from '@nestjs/testing';
import { EmailChannelService } from './email-channel.service';
import { CHANNEL_TYPES } from '../channels.constants';

describe('EmailChannelService', () => {
  let service: EmailChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailChannelService],
    }).compile();

    service = module.get<EmailChannelService>(EmailChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return email channel type', () => {
    expect(service.getChannelType()).toBe(CHANNEL_TYPES.EMAIL);
  });

  it('should send email notification', () => {
    const payload = { companyId: '123', userId: '456', notificationType: 'test' };
    expect(service.sendNotification(payload)).toBe('Notification sent to Email');
  });
});
