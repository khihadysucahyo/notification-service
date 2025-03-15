import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto {
    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    notificationType: string;
} 