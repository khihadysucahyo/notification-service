import { Injectable } from '@nestjs/common';
import { ITemplateCompiler } from '../interfaces/template-compiler.interface';
import { TemplateData } from '../dto/template-data.dto';

/**
 * Basic implementation of template compiler
 * Uses simple string replacement with {{placeholder}} syntax
 */
@Injectable()
export class TemplateCompilerProvider implements ITemplateCompiler {
    compile(template: string, data: TemplateData): string {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || match;
        });
    }
} 