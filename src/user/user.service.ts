import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
    mockUsers: Record<string, User> = {
        'user-1': { id: 'user-1', name: 'Alice', subscriptions: { ui: true, email: true } },
        'user-2': { id: 'user-2', name: 'Bob', subscriptions: { ui: true, email: false } },
    };

    async getAllSubscriptions(userId: string): Promise<Record<string, boolean> | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = this.mockUsers[userId];
                resolve(user ? user.subscriptions : undefined);
            }, 5); // Simulate API call
        });
    }
}
