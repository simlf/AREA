import { Controller, Get } from '@nestjs/common';
import { MeteoService } from './meteo.service';
import { HttpService } from '@nestjs/axios';


@Controller('meteo')
export class MeteoController {
    constructor(private meteoService: MeteoService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/sendTemperature"]}
    }

    @Get('sendTemperature')
    sendTemperature() {
        return this.meteoService.getTemperature()
    }
}