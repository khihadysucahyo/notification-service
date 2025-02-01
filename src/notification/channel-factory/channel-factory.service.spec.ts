import { Test, TestingModule } from '@nestjs/testing';
import { ChannelFactoryService } from './channel-factory.service';
import { UiChannelService } from '../channels/ui-channel/ui-channel.service';
import { EmailChannelService } from '../channels/email-channel/email-channel.service';
import { NOTIFICATION_TYPES } from '../notification-config';

describe('ChannelFactoryService', () => {
  let channelFactoryService: ChannelFactoryService;
  let uiChannelService: UiChannelService;
  let emailChannelService: EmailChannelService;

  beforeEach(async () => {
    uiChannelService = { sendNotification: jest.fn() } as unknown as UiChannelService;
    emailChannelService = { sendNotification: jest.fn() } as unknown as EmailChannelService;
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelFactoryService,
        {
          provide: UiChannelService,
          useValue: uiChannelService,
        },
        {
          provide: EmailChannelService,
          useValue: emailChannelService,
        },
      ],
    }).compile();

    channelFactoryService = module.get<ChannelFactoryService>(ChannelFactoryService);
    uiChannelService = module.get<UiChannelService>(UiChannelService);
    emailChannelService = module.get<EmailChannelService>(EmailChannelService);
  });

  it('should be defined', () => {
    expect(channelFactoryService).toBeDefined();
  });

  it('should return UI channel for leave-balance-reminder notification type', () => {
    const channels = channelFactoryService.getChannels(NOTIFICATION_TYPES.LEAVE_BALANCE_REMINDER);
    expect(channels).toEqual([uiChannelService]);
  });

  it('should return Email channel for monthly-payslip notification type', () => {
    const channels = channelFactoryService.getChannels(NOTIFICATION_TYPES.MONTHLY_PAYSLIP);
    expect(channels).toEqual([emailChannelService]);
  });

  it('should return both UI and Email channels for happy-birthday notification type', () => {
    const channels = channelFactoryService.getChannels(NOTIFICATION_TYPES.HAPPY_BIRTHDAY);
    expect(channels).toEqual([uiChannelService, emailChannelService]);
  });
});