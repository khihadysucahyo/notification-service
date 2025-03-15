import { Injectable } from '@nestjs/common';
import { ITemplateRegistry } from '../interfaces/template-registry.interface';
import { NotificationTemplate } from '../interfaces/notification-template.interface';
import { NOTIFICATION_TYPES } from '../../../../notification-config';

@Injectable()
export class TemplateRegistry implements ITemplateRegistry {
    private templates: Map<string, NotificationTemplate> = new Map([
        [NOTIFICATION_TYPES.HAPPY_BIRTHDAY, {
            email: {
                subject: 'Happy Birthday {{name}}',
                content: '{{companyName}} is wishing you a happy birthday!'
            },
            ui: {
                content: 'Happy Birthday {{name}}'
            }
        }]
    ]);

    getTemplate(type: string): NotificationTemplate | undefined {
        return this.templates.get(type);
    }

    registerTemplate(type: string, template: NotificationTemplate): void {
        this.templates.set(type, template);
    }
} 