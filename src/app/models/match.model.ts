import {Hero} from './hero.model';
import {Coding} from './coding.model';
import {DetailedPlayer} from './player.model';

export class Match {
    id: number;
    playerSlot: number;
    radiantWin: boolean;
    duration: number;
    gameMode: Coding;
    lobbyType: Coding;
    hero: Hero;
    startTime: Date;
    version: number;
    kills: number;
    deaths: number;
    assists: number;
    skill: number;
    lane: number;
    laneRole: Coding;
    isRoaming: boolean;
    cluster: number;
    leaverStatus: number;
    partySize: number;

    get isRadiant() {
        return this.playerSlot < 100;
    }
}


export class DetailedMatch {
    id: number;
    barracksStatusDire: number;
    barracksStatusRadiant: number;
    chat: [
        {
            time: number;
            unit: string;
            key: string;
            slot: number;
            player_slot: number
        }
    ];
    cluster: number;
    cosmetics: any;
    direScore: number;
    draftTimings: [
        {
            order: number;
            pick: boolean;
            activeTeam: number;
            heroId: number;
            playerSlot: number;
            extraTime: number;
            totalTimeTaken: number
        }
    ];
    duration: number;
    engine: number;
    firstBloodTime: number;
    gameMode: any;
    humanPlayers: number;
    leagueId: number;
    lobbyType: number;
    matchSeqNum: number;
    negativeVotes: number;
    objectives: any;
    picksBans: any;
    positiveVotes: number;
    radiantGoldAdv: any;
    radiantScore: number;
    radiantWin: boolean;
    radiantXpAdv: any;
    startTime: number;
    teamFights: any;
    towerStatusDire: number;
    towerStatusRadiant: number;
    version: number;
    replaySalt: number;
    seriesId: number;
    seriesType: number;
    radiantTeam: any;
    direTeam: any;
    league: any;
    skill: number;
    players: DetailedPlayer[];
    patch: number;
    region: number;
    allWordCounts: any;
    myWordCounts: any;
    throw: number;
    comeback: number;
    loss: number;
    win: number;
    replayUrl: string;
}


