import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { LeagueUser } from './League.model';

let base_url1 = "https://euw1.api.riotgames.com/lol/"
let key = process.env.LEAGUE_API
let base_url2 = "https://europe.api.riotgames.com/lol/"


/// For all services, the username used by default is CrossBiwBoyExoPa
@Injectable()
export class LeagueService {
        constructor(private readonly httpService: HttpService) {}

    /// return the current level of a player
    async getLevel(username : string = "CrossBiwBoyExoPa"): Promise<LeagueUser> {
        let returnValue: LeagueUser = new LeagueUser();
        const url = `${base_url1}summoner/v4/summoners/by-name/${username}?api_key=${key}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url))
            const level = data.summonerLevel;
            returnValue.username = username;
            returnValue.icon_id = data.profileIconId;
            returnValue.revision_date = data.revisionDate;
            returnValue.puuid = data.puuid;
            returnValue.level = data.summonerLevel;
        } catch (error) {            
            console.error({"Error" : error.code, "Message" : error.message})
        }
        return returnValue;
  }

    /// Return a win ratio from last 48 hours
    async getMatches(username : string = "CrossBiwBoyExoPa"): Promise<LeagueUser> {
        let returnValue: LeagueUser = new LeagueUser();
        const url1 = `${base_url1}summoner/v4/summoners/by-name/${username}?api_key=${key}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url1));
            const puuid = data.puuid
            returnValue.username = username;
            returnValue.puuid = puuid;
            let date = new Date(new Date().getTime() - (48 * 60 * 60 * 1000));
            let newDate = (Math.round(date.getTime() / 1000))
            let url2 = `${base_url2}match/v5/matches/by-puuid/${puuid}/ids?startTime=${((newDate).toString())}&start=0&count=20&api_key=${key}`;
            const a = await firstValueFrom(this.httpService.get(url2));
            let win_count = 0;
            let total_match = 0   
            for (; total_match < Object.keys(a.data).length; total_match++) {
                let url3 = `${base_url2}match/v5/matches/${a.data[total_match]}?api_key=${key}`
                const b = await firstValueFrom(this.httpService.get(url3));
                console.log(b.data);
                for (let j = 0; j < Object.keys(b.data.info.participants).length; j++) {
                    if (b.data.info.participants[j].puuid == puuid) {
                        if (b.data.info.participants[j].win == true)
                            win_count += 1
                    }
                }
            }
            returnValue.total_wins = win_count
            returnValue.total_losses = total_match - win_count
            returnValue.winrate = (win_count / total_match)
            return returnValue;
        } catch (error) {
            console.log({"Error" : error.code, "Message" : error.message});
        }
    }


    /// Return the summoner name of the top Europpean player 
    async getRankOne(username : string = "CrossBiwBoyExoPa"): Promise<LeagueUser> {
        let returnValue: LeagueUser = new LeagueUser();
        const url = `${base_url1}league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${key}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url));
            let size = Object.keys(data.entries).length
            let save = 0;
            let lpsave = 0;
            for (let i = 0; i != size; i++) {
                if (lpsave < data.entries[i].leaguePoints) {
                    save = i;
                    lpsave = data.entries[i].leaguePoints;
                }
            }
            returnValue.top_player_username = data.entries[save].summonerName
            returnValue.total_league_points = data.entries[save].leaguePoints
            returnValue.total_losses = data.entries[save].losses
            returnValue.total_wins = data.entries[save].wins
            returnValue.winrate = (data.entries[save].wins / (data.entries[save].wins + data.entries[save].losses)) * 100
            return returnValue;
        } catch(error) {
            console.error({"Error" : error.code, "Message" : error.message});
        }
    }

    async getLastChallenge(username : string = "CrossBiwBoyExoPa") {
        const url1 = `${base_url1}summoner/v4/summoners/by-name/${username}?api_key=${key}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url1));
            const puuid = data.puuid
            var return_value = { 
                "puuid"                     :  puuid,
                "username"                  :  username,
                "actual_challenge_level"    :  null,
                "total_challenge_point"     :  null,
                "actual_rank_percentile"    :  null,
                "last_challenge_name"       :  null, 
                "last_challenge_id"         :  null,
                "last_challenge_date"       :  null,

            }
            console.log(puuid)
            let url2 = `${base_url1}challenges/v1/player-data/${puuid}?api_key=${key}`
            const challenges_list = await firstValueFrom(this.httpService.get(url2));
            let size = Object.keys(challenges_list.data.challenges).length
            let save = 0;
            let last_save = 0;
            for (let i = 0; i != size; i++) {
                if (last_save < challenges_list.data.challenges[i].achievedTime) {
                    save = i;
                    last_save = challenges_list.data.challenges[i].achievedTime;
                }
            }
            console.log(challenges_list.data.challenges[save])
            let url3 = `${base_url1}challenges/v1/challenges/${challenges_list.data.challenges[save].challengeId}/config?api_key=${key}`
            const challenges_info = await firstValueFrom(this.httpService.get(url3));
        
            return_value.total_challenge_point = challenges_list.data.challenges[save].current
            return_value.actual_rank_percentile = challenges_list.data.challenges[save].percentile
            return_value.actual_challenge_level = challenges_list.data.challenges[save].level
            return_value.last_challenge_id = challenges_info.data.id
            return_value.last_challenge_name = challenges_info.data.localizedNames.en_US.name
            return_value.last_challenge_date = challenges_list.data.challenges[save].achievedTime
            console.log(return_value)
            return return_value
        } catch(error) {
            return {"Error" : error.code, "Message" : error.message}
        }
    }

    
    /// Return statistics from the last $gameToCheck games (a large number lower drastically the performance. Also can easily reach the maximum number fo request)
    async getSeasonStatistics(username : string = "CrossBiwBoyExoPa", gameToCheck : number = 10) {
        const url1 = `${base_url1}summoner/v4/summoners/by-name/${username}?api_key=${key}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url1));
            const puuid = data.puuid
            var return_value = { 
                "username"                  :  username,
                "puuid"                     :  puuid,                     
                "total_game"                :  0,
                "total_wins"                :  0,
                "total_losses"              :  0,
                "winrate"                   :  0,
                "doublekills"               :  0,
                "triplekills"               :  0,
                "quadrakills"               :  0,
                "pentakills"                :  0,
                "total_kill"                :  0,
                "total_death"               :  0,
                "total_gold_earned"         :  0,
                "last_game_played_id"       :  0,
            
            }
            let url2 = `${base_url2}match/v5/matches/by-puuid/${puuid}/ids?startTime=1672531200&start=0&count=${gameToCheck.toString()}&api_key=${key}`;
            const a = await firstValueFrom(this.httpService.get(url2));
            let total_match = 0           
            return_value.last_game_played_id = a.data[0]
            for (; total_match < Object.keys(a.data).length; total_match++) {
                let url3 = `${base_url2}match/v5/matches/${a.data[total_match]}?api_key=${key}`
                const b = await firstValueFrom(this.httpService.get(url3));
                for (let j = 0; j < Object.keys(b.data.info.participants).length; j++) {
                    if (b.data.info.participants[j].puuid == puuid) {
                        return_value.pentakills += b.data.info.participants[j].pentaKills;
                        return_value.quadrakills += b.data.info.participants[j].quadraKills;
                        return_value.triplekills += b.data.info.participants[j].tripleKills;
                        return_value.doublekills += b.data.info.participants[j].doubleKills;
                        return_value.total_kill += b.data.info.participants[j].kills;
                        return_value.total_death += b.data.info.participants[j].deaths;
                        return_value.total_gold_earned += b.data.info.participants[j].goldEarned;
                        if (b.data.info.participants[j].win == true) {
                            return_value.total_wins += 1;
                        } else {
                            return_value.total_losses += 1;
                        }
                    }
                }
            }
            return_value.total_game = total_match
            return_value.winrate = (return_value.total_wins / total_match)
            return return_value;
        } catch(error) {
            return {"Error" : error.code, "Message" : error.message}
        }
    }

    /// Count the mastery of an account. Only mastery 4 and above + the chests
    async getChampionMastery(username : string = "CrossBiwBoyExoPa") {
        const url1 = `${base_url1}summoner/v4/summoners/by-name/${username}?api_key=${key}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url1));
            const puuid = data.puuid
            var return_value = { 
                "username"                  :  username,
                "puuid"                     :  puuid,
                "level4_mastery"            :  0,
                "level5_mastery"            :  0,
                "level6_mastery"            :  0,
                "level7_mastery"            :  0,            
                "chests_granted"            :  0,
            }
            console.log(data.id)
            let url2 = `${base_url1}champion-mastery/v4/champion-masteries/by-summoner/${data.id}?api_key=${key}`;
            const a = await firstValueFrom(this.httpService.get(url2));
            console.log(url2)
            for (let total_champ = 0; total_champ < Object.keys(a.data).length; total_champ++) {
                if (a.data[total_champ].championLevel == 7)
                    return_value.level7_mastery += 1
                if (a.data[total_champ].championLevel == 6)
                    return_value.level6_mastery += 1
                if (a.data[total_champ].championLevel == 5)
                    return_value.level5_mastery += 1
                if (a.data[total_champ].championLevel == 4)
                    return_value.level4_mastery += 1
                if (a.data[total_champ].chestGranted == true)
                    return_value.chests_granted += 1
            }
            return return_value;
        } catch(error) {
            return {"Error" : error.code, "Message" : error.message}
        } 
    }
}

