import { Controller, Get } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { HttpService } from '@nestjs/axios';

@Controller('nasa')
export class NasaController {
    constructor(private nasaService: NasaService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/imageOfTheDay"]}
    }

    @Get('imageOfTheDay')
    getLevel() {
        return this.nasaService.getImageOfTheDay()
    }
}