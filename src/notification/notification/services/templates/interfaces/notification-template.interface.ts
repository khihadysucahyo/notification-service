import { EmailTemplate } from './email-template.interface';
import { UITemplate } from './ui-template.interface';

export interface NotificationTemplate {
    email?: EmailTemplate;
    ui?: UITemplate;
} 