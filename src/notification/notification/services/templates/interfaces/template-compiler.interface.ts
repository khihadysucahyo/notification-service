import { TemplateData } from './template-data.interface';

export interface ITemplateCompiler {
    compile(template: string, data: TemplateData): string;
} 