import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRateRequestDTO } from 'src/dto/CreateRateRequestDTO';
import { RateService } from './RateService';

@Controller('/rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  async createRate(@Body() payload: CreateRateRequestDTO) {
    return this.rateService.createRate(payload);
  }

  @Get()
  async getRates() {
    return this.rateService.getRates();
  }
}
