import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { EventModule } from './event/event.module';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import AppProvider from './app.provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ContentModule,
    EventModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppProvider],
})
export class AppModule {}
