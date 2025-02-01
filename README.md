# Notification Service

## Overview
The Notification Service allows companies to send notifications to users through various channels like **UI** and **email**. Users and companies can subscribe to different notification types, and the service manages the sending of notifications based on these preferences. 

The service provides the following key features:
- Sending notifications of different types (e.g., leave balance reminders, monthly payslips, birthday greetings).
- Handling subscriptions for users and companies for specific notification channels.
- Providing APIs for sending and fetching notifications based on user preferences.

## Service Structure
```
src/
├── company/                # Contains logic related to companies, data will come from another service
│   └── service/            # Service logic for company-related operations (external data)
├── user/                   # Contains logic related to users
│   └── service/            # Service logic for user-related operations
└── notification/           # Main directory for notification-related components
    ├── config/             # Configuration files for setting up notification channels
    ├── notification/       # Core notification handling logic
    │   ├── channel-factory/  # Factory for creating notification channels (email, UI, etc.)
    │   ├── channels/        # Contains specific channels like email and UI
    │   │   ├── email/      # Email notification handling
    │   │   └── ui/         # UI notification handling
    │   ├── notification/    # Core notification service logic
    │   │   ├── service/    # Notification service logic
    │   │   ├── repository/ # Handles storage/retrieval of notification data
    │   │   └── controller/ # Manages the flow of incoming requests related to notifications
```

## Available Commands
- Start the Notification Service: ```make run```
- Run the tests: ```make test```

## Data Mock
### Users
- `user-1`: Subscribed **UI** and **email**.
- `user-2`: Subscribed **UI** only.

### Companies
- `company-abc`: Subscribed **UI** & **email**.
- `company-def`: Unsubscribed any channels.

## Notification Types
- `leave-balance-reminder`: Leave balance reminder.
- `monthly-payslip`: Monthly payslip.
- `happy-birthday`: Happy birthday wish.

## API Endpoints
### 1. Send Notification
Send a notification to a user:

```bash
curl --location 'http://localhost:3033/notifications/send' \
--header 'Content-Type: application/json' \
--data '{
  "companyId": "company-abc",
  "userId": "user-1",
  "notificationType": "leave-balance-reminder"
}'
```

### 2. Get User Notification (UI Channel)
Get notifications for a user via the UI channel:
```bash
curl --location --request GET 'http://localhost:3033/notifications/users/user-1/ui' \
--header 'Content-Type: application/json' \
--data '{
  "companyId": "company-abc",
  "userId": "user-1",
  "notificationType": "monthly-payslip"
}'
```