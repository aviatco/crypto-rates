import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/cryptoRates')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getCryptoRates(): Promise<any> {
    return await this.appService.getCreptoRates();
  }
}
