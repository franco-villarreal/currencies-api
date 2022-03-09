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
}

export const RateSchema = SchemaFactory.createForClass(Rate);
