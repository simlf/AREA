import { Injectable, Redirect } from '@nestjs/common';
import { firstValueFrom, map, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { response } from 'express';
//import { LinearClient, LinearFetch, User } from "@linear/sdk" 
import { connect } from 'http2';
import { UserEntity } from 'src/users/entity/UserEntity';
import { toUserDto } from 'src/utils/mapper';
import { comparePasswords } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { DataSource } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LinearService {
    constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ) {}
    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options)
        if (!user)
            return null
        return user
    }

  
    async getTest() {
        let response = 'code'
        let id = 'a54c3e124f5b80f45772aedc8bb5994e'
        let redirect = 'http://localhost:8080/linear/redirect'
        let scope = 'read,write'
        let url = `https://linear.app/oauth/authorize?response_type=${response}&client_id=${id}&redirect_uri=${redirect}&scope=${scope}`
        console.log(url)
        return "hi  "
    }
    async getRedirect() {
        return "hoe hoe hoe";
    }
    async callback(code : string = null) {
        console.log(`Code is ${code}`)
        if (code == null) {
            return "Invalid callback code"
        }
        var axios = require('axios');
        var qs = require('qs');
        const mysqlconfig = {
            host                : 'localhost',
            user                : 'root',
            password            : 'root',
            database            : 'area_database'
        };
        var data = qs.stringify({
        'code'                : code,
        'redirect_uri'        : 'http://localhost:8080/linear/oauth/callback',
        'client_id'           : 'a54c3e124f5b80f45772aedc8bb5994e',
        'client_secret'       : '9ddd759d3c23bda2bee4bc367b313b1a',
        'grant_type'          : 'authorization_code' 
        });
        var config = {
        method                : 'post',
        maxBodyLength         : Infinity,
        url                   : 'https://api.linear.app/oauth/token',
        headers: { 
            'Content-Type'      : 'application/x-www-form-urlencoded', 
            'Cookie'            : '_cfuvid=IZ.5T5yQmZtrSNE_CubzmCgQlEXgCCKeAZQHyV4Jsvw-1676470023332-0-604800000'
        },
        data                  : data
        };
        const AppDataSource = new DataSource({
            type: "mysql",
            host: "area_db",
            port: 3306,
            username: "root",
            password: "root",
            database: "area_database",
            entities: [UserEntity],
            synchronize: true,
            logging: false,
        })
        AppDataSource.initialize().then(() => {
            axios(config).then(async function (res) {
                console.log(res)
                console.log(`Creating entity with code ${res.data.access_token}`)
                const usr = new UserEntity()
           //     usr.linearToken = String(res.data.access_token)
                usr.password = "password"
                usr.email = "test"  
                await AppDataSource.manager.save(usr)
            })
            .catch(function (error) {
                console.log("Error")
                console.log(error);
            });
        }).catch((error) => console.log(error))
    }
}