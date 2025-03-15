// Template Data Interfaces
export interface TemplateData {
    name: string;
    companyName: string;
    [key: string]: string;
}

// Template Structure Interfaces
export interface EmailTemplate {
    subject: string;
    content: string;
}

export interface UITemplate {
    content: string;
}

export interface NotificationTemplate {
    email?: EmailTemplate;
    ui?: UITemplate;
}

// Service Interfaces
export interface ITemplateCompiler {
    compile(template: string, data: TemplateData): string;
}

export interface ITemplateRegistry {
    getTemplate(type: string): NotificationTemplate | undefined;
    registerTemplate(type: string, template: NotificationTemplate): void;
}

export interface ITemplateDataProvider {
    getTemplateData(userId: string, companyId: string): Promise<TemplateData>;
} 