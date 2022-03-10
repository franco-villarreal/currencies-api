import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRateRequestDTO } from '../dto/CreateRateRequestDTO';
import { Rate } from '../schemas/Rate';
import { RateService } from './RateService';

@Controller('/api/rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  async getRates(): Promise<Rate[]> {
    return this.rateService.getRates();
  }

  @Get('/latest')
  async getLatestRates(): Promise<Rate[]> {
    return this.rateService.getLatestRates();
  }

  @Post()
  async createRates(@Body() payload: CreateRateRequestDTO): Promise<Rate> {
    return this.rateService.createRates(payload);
  }
}
