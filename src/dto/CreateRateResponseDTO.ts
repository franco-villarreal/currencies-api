import { IsNumber, IsString } from 'class-validator';

export class CreateRateRequestDTO {
  @IsString()
  pair: string;

  @IsNumber()
  feePercent: number;

  @IsNumber()
  feeAmount: number;

  @IsNumber()
  originalRate: number;

  @IsNumber()
  rate: number;
}
