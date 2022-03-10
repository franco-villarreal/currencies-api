import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  @Prop()
  pair: string;

  @Prop()
  originalRate: number;

  @Prop()
  feePercent: number;

  @Prop()
  feeAmount: number;

  @Prop()
  rate: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RateSchema = SchemaFactory.createForClass(Rate);
