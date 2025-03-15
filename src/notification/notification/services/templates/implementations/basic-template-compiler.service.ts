import { Injectable } from '@nestjs/common';
import { ITemplateCompiler } from '../interfaces/template-compiler.interface';
import { TemplateData } from '../interfaces/template-data.interface';

@Injectable()
export class BasicTemplateCompiler implements ITemplateCompiler {
    compile(template: string, data: TemplateData): string {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || match;
        });
    }
} 