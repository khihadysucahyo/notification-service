import { Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { CompanyModule } from '../../company/company.module';
import { TemplateService } from './template.service';
import { TemplateCompilerProvider } from './providers/template-compiler.provider';
import { TemplateDataProvider } from './providers/template-data.provider';
import { TemplateRegistryProvider } from './providers/template-registry.provider';

@Module({
    imports: [
        UserModule,
        CompanyModule
    ],
    providers: [
        TemplateService,
        TemplateCompilerProvider,
        TemplateDataProvider,
        TemplateRegistryProvider
    ],
    exports: [TemplateService]
})
export class TemplateModule {} 