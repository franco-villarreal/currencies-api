import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rate, RateSchema } from 'src/schemas/Rate';
import { RateController } from './RateController';
import { RateService } from './RateService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rate.name, schema: RateSchema }]),
  ],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
