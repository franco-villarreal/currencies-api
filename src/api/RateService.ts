import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { CreateRateRequestDTO } from '../dto/CreateRateRequestDTO';
import { Rate, RateDocument } from '../schemas/Rate';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { FIXER_BASE_URL, FIXER_API_KEY } = process.env;

@Injectable()
export class RateService {
  constructor(@InjectModel(Rate.name) private rateModel: Model<RateDocument>) {}

  async createRates(payload: CreateRateRequestDTO): Promise<Rate> {
    try {
      const { pair, feePercent } = payload;
      const originalRate = await this.getOriginalRate(pair);
      const feeAmount = (originalRate * feePercent) / 100;

      const createdRate = new this.rateModel({
        pair,
        originalRate,
        feePercent,
        feeAmount,
        rate: feeAmount + originalRate,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return createdRate.save();
    } catch (error) {
      Logger.error(
        `There was an error obtaining rates: ${error} ${error.stack}`,
      );
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRates(): Promise<Rate[]> {
    try {
      return this.rateModel.find();
    } catch (error) {
      Logger.error(
        `There was an error obtaining rates: ${error} ${error.stack}`,
      );
      throw new InternalServerErrorException(error.message);
    }
  }

  async getLatestRates(): Promise<Rate[]> {
    try {
      const response = [];
      const query = await this.rateModel.aggregate([
        {
          $group: { _id: '$pair', Files: { $push: '$$ROOT' } },
        },
        { $sort: { createdAt: -1 } },
      ]);

      query.forEach((result) => {
        response.push(result.Files[0]);
      });
      return response;
    } catch (error) {
      Logger.error(
        `There was an error obtaining rates: ${error} ${error.stack}`,
      );
      throw new InternalServerErrorException(error.message);
    }
  }

  private parsePair(pair: string) {
    return {
      base: pair.substring(0, 3),
      symbol: pair.substring(3, 6),
    };
  }

  private async getOriginalRate(pair: string): Promise<number> {
    const { base, symbol } = this.parsePair(pair);

    const {
      data: { rates },
    } = await axios.get(`${FIXER_BASE_URL}/latest?access_key=${FIXER_API_KEY}`);

    const baseValue = rates[base];
    const symbolValue = rates[symbol];

    if (!baseValue || !symbolValue) {
      throw new BadRequestException('Provided pair is not valid');
    }

    return symbolValue / baseValue;
  }
}
