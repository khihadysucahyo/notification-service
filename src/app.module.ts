import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
        dbName: configService.get<string>('mongo.dbName'),
        user: configService.get<string>('mongo.username'),
        pass: configService.get<string>('mongo.password'),
      }),
      inject: [ConfigService],
    }),

    NotificationModule,

    CompanyModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
