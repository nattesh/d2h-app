import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {odotaEndpoints} from '../constants/endpoints.constant';
import {map} from 'rxjs/operators';
import {DetailedMatch, Match} from '../models/match.model';
import {HeroService} from './hero.service';
import {gameModes, lanes, lobbyTypes} from '../constants/codings.contants';
import {PlayerService} from './player.service';

@Injectable({
    providedIn: 'root'
})
export class MatchesService {

    lastPlayerIsOpen = new EventEmitter();

    constructor(private http: HttpClient,
                private playerService: PlayerService,
                private heroService: HeroService) {
    }

    openLast() {
        this.lastPlayerIsOpen.emit();
    }

    getRecentMatchesByUser(userId: string) {
        return this.http.get(odotaEndpoints.match.recentMatches(userId)).pipe(
            map((data) => this.mapArray(data))
        );
    }

    getAllMatchesByUser(userId: string, turbo: boolean) {
        return this.http.get(odotaEndpoints.match.allMatches(userId, turbo)).pipe(
            map((data) => this.mapAllMatches(data))
        );
    }

    getMatchDetails(matchId: string) {
        return this.http.get(odotaEndpoints.match.matchDetails(matchId)).pipe(
            map((data) => this.mapSingleDetailedMatch(data) )
        );
    }

    mapArray(array): any[] {
        const finalArr = [];
        for (const dMatch of array) {
            finalArr.push(this.mapSingleRecentMatch(dMatch));
        }
        return finalArr;
    }

    mapAllMatches(array): any[] {
        const finalArr = [];
        for (const dMatch of array) {
            finalArr.push(this.mapSingleAllMatch(dMatch));
        }
        return finalArr;
    }

    mapDetailedMatches(array) {
        const finalArr = [];
        for (const dMatch of array) {
            finalArr.push(this.mapSingleDetailedMatch(dMatch));
        }
        return finalArr;
    }

    mapSingleRecentMatch(dMatch): Match {
        const match = new Match();
        match.id = dMatch.match_id;
        match.playerSlot = dMatch.player_slot;
        match.radiantWin = dMatch.radiant_win;
        match.duration = dMatch.duration;
        match.gameMode = gameModes[dMatch.game_mode];
        match.lobbyType = lobbyTypes[dMatch.lobby_type];
        match.hero = this.heroService.getHeroById(dMatch.hero_id);
        match.startTime = new Date(dMatch.start_time * 1000);
        match.version = dMatch.version;
        match.kills = dMatch.kills;
        match.deaths = dMatch.deaths;
        match.assists = dMatch.assists;
        match.skill = dMatch.skill;
        match.lane = dMatch.lane;
        match.laneRole = lanes[dMatch.lane_role];
        match.isRoaming = dMatch.is_roaming;
        match.cluster = dMatch.cluster;
        match.leaverStatus = dMatch.leaver_status;
        match.partySize = dMatch.party_size;

        return match;
    }

    mapSingleAllMatch(dMatch): Match {
        const match = new Match();
        match.id = dMatch.match_id;
        match.playerSlot = dMatch.player_slot;
        match.radiantWin = dMatch.radiant_win;
        match.duration = dMatch.duration;
        match.gameMode = gameModes[dMatch.game_mode];
        match.lobbyType = lobbyTypes[dMatch.lobby_type];
        match.hero = this.heroService.getHeroById(dMatch.hero_id);
        match.startTime = new Date(dMatch.start_time * 1000);
        match.version = dMatch.version;
        match.kills = dMatch.kills;
        match.deaths = dMatch.deaths;
        match.assists = dMatch.assists;
        match.skill = dMatch.skill;
        match.partySize = dMatch.party_size;

        return match;
    }

    mapSingleDetailedMatch(dMatch): DetailedMatch {
        const match = new DetailedMatch();
        match.id = dMatch.match_id;
        match.barracksStatusDire = dMatch.barracks_status_dire;
        match.barracksStatusRadiant = dMatch.barracks_status_radiant;
        match.chat = dMatch.chat;
        match.cluster = dMatch.cluster;
        match.cosmetics = dMatch.cosmetics;
        match.direScore = dMatch.dire_score;
        match.draftTimings = dMatch.draft_timings;
        match.duration = dMatch.duration;
        match.engine = dMatch.engine;
        match.firstBloodTime = dMatch.first_blood_time;
        match.gameMode = gameModes[dMatch.game_mode];
        match.humanPlayers = dMatch.human_players;
        match.leagueId = dMatch.leagueid;
        match.lobbyType = dMatch.lobby_type;
        match.matchSeqNum = dMatch.match_seq_num;
        match.negativeVotes = dMatch.negative_votes;
        match.objectives = dMatch.objectives;
        match.picksBans = dMatch.picks_bans;
        match.positiveVotes = dMatch.positive_votes;
        match.radiantGoldAdv = dMatch.radiant_gold_adv;
        match.radiantScore = dMatch.radiant_score;
        match.radiantWin = dMatch.radiant_win;
        match.radiantXpAdv = dMatch.radiant_xp_adv;
        match.startTime = dMatch.start_time;
        match.teamFights = dMatch.teamfights;
        match.towerStatusDire = dMatch.tower_status_dire;
        match.towerStatusRadiant = dMatch.tower_status_radiant;
        match.version = dMatch.version;
        match.replaySalt = dMatch.replay_salt;
        match.seriesId = dMatch.series_id;
        match.seriesType = dMatch.series_type;
        match.radiantTeam = dMatch.radiant_team;
        match.direTeam = dMatch.dire_team;
        match.league = dMatch.league;
        match.skill = dMatch.skill;
        match.players = this.playerService.mapDetailedPlayers(dMatch.players);
        match.patch = dMatch.patch;
        match.region = dMatch.region;
        match.allWordCounts = dMatch.all_word_counts;
        match.myWordCounts = dMatch.my_word_counts;
        match.towerStatusRadiant = dMatch.tower_status_radiant;
        match.throw = dMatch.throw;
        match.comeback = dMatch.comeback;
        match.loss = dMatch.loss;
        match.win = dMatch.win;
        match.replayUrl = dMatch.replay_url;

        return match;
    }
}
