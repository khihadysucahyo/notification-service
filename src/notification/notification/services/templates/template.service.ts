import { Injectable } from '@nestjs/common';
import { ITemplateRegistry } from './interfaces/template-registry.interface';
import { ITemplateCompiler } from './interfaces/template-compiler.interface';
import { ITemplateDataProvider } from './interfaces/template-data-provider.interface';
import { NotificationTemplate } from './interfaces/notification-template.interface';

/**
 * Service responsible for managing and compiling notification templates.
 * Uses template registry for storage, template compiler for processing,
 * and data provider for gathering required data.
 */
@Injectable()
export class TemplateService {
    constructor(
        private readonly templateRegistry: ITemplateRegistry,
        private readonly templateCompiler: ITemplateCompiler,
        private readonly dataProvider: ITemplateDataProvider,
    ) {}

    /**
     * Retrieves and compiles a template for the specified notification type
     * @param notificationType - Type of notification to get template for
     * @param companyId - ID of the company
     * @param userId - ID of the user
     * @returns Compiled notification template
     * @throws Error if template not found or required data missing
     */
    async getCompiledTemplate(
        notificationType: string,
        companyId: string,
        userId: string
    ): Promise<NotificationTemplate> {
        // Get template from registry
        const template = this.templateRegistry.getTemplate(notificationType);
        if (!template) {
            throw new Error(`Template not found for notification type: ${notificationType}`);
        }

        // Get required data
        const templateData = await this.dataProvider.getTemplateData(userId, companyId);

        // Compile template
        const compiledTemplate: NotificationTemplate = {};

        if (template.email) {
            compiledTemplate.email = {
                subject: this.templateCompiler.compile(template.email.subject, templateData),
                content: this.templateCompiler.compile(template.email.content, templateData)
            };
        }

        if (template.ui) {
            compiledTemplate.ui = {
                content: this.templateCompiler.compile(template.ui.content, templateData)
            };
        }

        return compiledTemplate;
    }
} 