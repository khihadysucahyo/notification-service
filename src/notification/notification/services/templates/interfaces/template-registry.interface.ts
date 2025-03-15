import { NotificationTemplate } from './notification-template.interface';

export interface ITemplateRegistry {
    getTemplate(type: string): NotificationTemplate | undefined;
    registerTemplate(type: string, template: NotificationTemplate): void;
} 