// Purpose: Interface for the notification channels.
// Create Shared Interfaces Folder:
// Define an interface for the notification channels 
// so that different channel services implement the same contract.
export interface INotificationChannel {
    getChannelType(): string;
    sendNotification(payload: any): string;
}
