import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateRateRequestDTO {
  @IsString()
  @Length(6)
  @IsNotEmpty()
  pair: string;

  @IsNumber()
  @IsNotEmpty()
  feePercent: number;
}
