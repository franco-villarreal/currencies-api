import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RateModule } from './api/RateModule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const { MONGODB_CONNECTION_STRING } = process.env;
@Module({
  imports: [MongooseModule.forRoot(MONGODB_CONNECTION_STRING), RateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
