import { Injectable } from '@nestjs/common';
import { UserService } from '../../../user/user.service';
import { CompanyService } from '../../../company/company.service';
import { ITemplateDataProvider, TemplateData } from '../interfaces/template.interface';

@Injectable()
export class TemplateDataProvider implements ITemplateDataProvider {
    constructor(
        private readonly userService: UserService,
        private readonly companyService: CompanyService,
    ) {}

    async getTemplateData(userId: string, companyId: string): Promise<TemplateData> {
        const [user, company] = await Promise.all([
            this.userService.getUserData(userId),
            this.companyService.getCompanyData(companyId)
        ]);

        if (!user || !company) {
            throw new Error('User or company not found');
        }

        return {
            name: user.name,
            companyName: company.name,
        };
    }
} 