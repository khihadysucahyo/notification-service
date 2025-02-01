import { Injectable } from '@nestjs/common';
import { Company } from './company.interface';

@Injectable()
export class CompanyService {
    private subscriptions: Record<string, boolean>;

    private mockCompanies: Record<string, Company> = {
        'company-abc': { id: 'company-abc', name: 'ABC Corp', subscriptions: { ui: true, email: true } },
        'company-def': { id: 'company-def', name: 'DEF Corp', subscriptions: { ui: false, email: false } },
    };

    async getAllSubscriptions(companyId: string): Promise<Record<string, boolean> | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const company = this.mockCompanies[companyId];
                resolve(company ? company.subscriptions : undefined);
            }, 5); // Simulate API call
        });
    }

    isChannelSubscribed(channel: string): boolean {
        return this.subscriptions[channel];
    }
}
