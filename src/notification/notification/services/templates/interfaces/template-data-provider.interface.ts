import { TemplateData } from './template-data.interface';

export interface ITemplateDataProvider {
    getTemplateData(userId: string, companyId: string): Promise<TemplateData>;
} 