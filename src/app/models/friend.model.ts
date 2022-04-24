import {Data} from '@angular/router';

export class Friend {
    accountId: number;
    lastPlayed: Data;
    win: number;
    games: number;
    withWin: number;
    withGames: number;
    againstWin: number;
    againstGames: number;
    withGpmSum: number;
    withXpmSum: number;
    personaName: string;
    name: string;
    isContributor: boolean;
    lastLogin: Date;
    avatar: string;
    avatarFull: string;
}
