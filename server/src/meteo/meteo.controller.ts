import { Controller, Get } from '@nestjs/common';
import { MeteoService } from './meteo.service';
import { HttpService } from '@nestjs/axios';


@Controller('meteo')
export class MeteoController {
    constructor(private meteoService: MeteoService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/SendTemperature"]}
    }

    @Get('SendTemperature')
    getLevel() {
        // var date = Date.UTC;
        // var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        // console.log(current_time);
        return this.meteoService.getTemperature()
    }
}