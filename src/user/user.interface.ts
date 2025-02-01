export interface User {
    id: string;
    name: string;
    subscriptions: Record<string, boolean>;
}
