import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRateRequestDTO } from '../dto/CreateRateRequestDTO';
import { Rate } from '../schemas/Rate';
import { RateService } from './RateService';

@Controller('/api/rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  async createRates(@Body() payload: CreateRateRequestDTO): Promise<Rate> {
    return this.rateService.createRates(payload);
  }

  @Get()
  async getRates(): Promise<Rate[]> {
    return this.rateService.getRates();
  }

  @Get('/latest')
  async getLatestRates(): Promise<Rate[]> {
    return this.rateService.getLatestRates();
  }

  @Get('/:id')
  async getRatesById(@Param('id') id: number): Promise<Rate> {
    return this.rateService.getRatesById(id);
  }

  @Delete('/:id')
  async deleteRatesById(@Param('id') id: number): Promise<void> {
    return this.rateService.deleteRatesById(id);
  }
}
