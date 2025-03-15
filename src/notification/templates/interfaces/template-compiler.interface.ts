import { TemplateData } from '../dto/template-data.dto';

/**
 * Interface for template compilation functionality
 */
export interface ITemplateCompiler {
    /**
     * Compiles a template string with provided data
     * @param template - Template string with placeholders
     * @param data - Data to be inserted into template
     * @returns Compiled template string
     */
    compile(template: string, data: TemplateData): string;
} 