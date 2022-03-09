import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { CreateRateRequestDTO } from 'src/dto/CreateRateRequestDTO';
import { Rate, RateDocument } from 'src/schemas/Rate';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const { FIXER_BASE_URL, FIXER_API_KEY } = process.env;

@Injectable()
export class RateService {
  constructor(@InjectModel(Rate.name) private rateModel: Model<RateDocument>) {}

  async createRate(payload: CreateRateRequestDTO) {
    const { pair, feePercent } = payload;
    const originalRate = await this.getOriginalRate(pair);
    const feeAmount = (originalRate * feePercent) / 100;

    const createdRate = new this.rateModel({
      pair,
      originalRate,
      feePercent,
      feeAmount,
      rate: feeAmount + originalRate,
    });

    return createdRate.save();
  }

  async getRates() {
    return this.rateModel.find();
  }

  private parsePair(pair: string) {
    return {
      base: pair.substring(0, 3),
      symbol: pair.substring(3, 6),
    };
  }

  private async getOriginalRate(pair: string): Promise<number> {
    const { base, symbol } = this.parsePair(pair);
    /*
    const {
      data: { rates },
    } = await axios.get(`${FIXER_BASE_URL}/latest?access_key=${FIXER_API_KEY}`);
    */
    const rates = {
      EUR: 1,
      USD: 1.08,
      ARS: 118.332543,
    };
    const baseValue = rates[base];
    const symbolValue = rates[symbol];
    if (!baseValue || !symbolValue) {
      throw new Error('Provided pass is not valid');
    }

    return symbolValue / baseValue;
  }
}
