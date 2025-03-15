import { Injectable } from '@nestjs/common';
import { NotificationTemplate, TemplateData } from './interfaces/template.interface';
import { TemplateCompilerProvider } from './providers/template-compiler.provider';
import { TemplateDataProvider } from './providers/template-data.provider';
import { TemplateRegistryProvider } from './providers/template-registry.provider';

@Injectable()
export class TemplateService {
    constructor(
        private readonly templateRegistry: TemplateRegistryProvider,
        private readonly templateCompiler: TemplateCompilerProvider,
        private readonly dataProvider: TemplateDataProvider,
    ) {}

    async getCompiledTemplate(
        notificationType: string,
        companyId: string,
        userId: string
    ): Promise<NotificationTemplate> {
        const template = this.templateRegistry.getTemplate(notificationType);
        if (!template) {
            throw new Error(`Template not found for notification type: ${notificationType}`);
        }

        const templateData = await this.dataProvider.getTemplateData(userId, companyId);
        return this.compileTemplate(template, templateData);
    }

    private compileTemplate(
        template: NotificationTemplate,
        data: TemplateData
    ): NotificationTemplate {
        const compiled: NotificationTemplate = {};

        if (template.email) {
            compiled.email = {
                subject: this.templateCompiler.compile(template.email.subject, data),
                content: this.templateCompiler.compile(template.email.content, data)
            };
        }

        if (template.ui) {
            compiled.ui = {
                content: this.templateCompiler.compile(template.ui.content, data)
            };
        }

        return compiled;
    }
} 