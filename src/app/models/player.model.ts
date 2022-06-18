import { PermanentBuff } from './permanent-buff.model';
import {Profile} from './profile.model';

export class Player {
    trackedUntil: Date;
    soloCompetitiveRank: number;
    profile: Profile;
    competitiveRank: number;
    rankTier: string;
    leaderboardRank: number;
    mmrEstimate: {
        estimate: number
    };
}


export class DetailedPlayer {
    id: number;
    playerSlot: number;
    abilityUpgradesArr: number[];
    abilityUses: any;
    abilityTargets: any;
    damageTargets: any;
    accountId: number;
    actions: any;
    additionalUnits: any;
    assists: number;
    backpack0: number;
    backpack1: number;
    backpack2: number;
    buybackLog: {
        time: number;
        slot: number;
        playerSlot: number
    }[];
    campsStacked: number;
    connectionLog: {
        time: number;
        event: string;
        playerSlot: number
    }[];
    creepsStacked: number;
    damage: any;
    damageInflictor: any;
    damageInflictorReceived: any;
    damageTaken: any;
    deaths: number;
    denies: number;
    dnt: number[];
    gold: number;
    goldPerMin: number;
    goldReasons: any;
    goldSpent: number;
    goldt: number[];
    heroDamage: number;
    heroHealing: number;
    heroHits: any;
    heroId: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    itemNeutral: number;
    itemUses: any;
    killStreaks: any;
    killed: any;
    killedBy: any;
    kills: number;
    killsLog: {
        time: number;
        key: string
    }[];
    lanePos: any;
    lastHits: number;
    leaverStatus: number;
    level: number;
    lht: number[];
    lifeState: any;
    maxHeroHit: any;
    multiKills: any;
    netWorth: any;
    obs: any;
    obsLeftLog: any[];
    obsLog: any[];
    obsPlaced: number;
    partyId: number;
    permanentBuffs: PermanentBuff[];
    pings: number;
    purchase: any;
    purchaseLog: {
        time: number;
        key: string
    }[];
    runePickups: number;
    runes: {
        property1: number;
        property2: number
    };
    runesLog: {
        time: number;
        key: number
    }[];
    sen: any;
    senLeftLog: any[];
    senLog: any[];
    senPlaced: number;
    stuns: number;
    times: number[];
    towerDamage: number;
    xpPerMin: number;
    xpReasons: any;
    xpt: number[];
    personaName: string;
    name: string;
    lastLogin: null;
    radiantWin: boolean;
    startTime: number;
    duration: number;
    cluster: number;
    lobbyType: number;
    gameMode: number;
    patch: number;
    region: number;
    isRadiant: boolean;
    win: number;
    lose: number;
    totalGold: number;
    totalXp: number;
    killsPerMin: number;
    kda: number;
    abandons: number;
    neutralKills: number;
    towerKills: number;
    courierKills: number;
    laneKills: number;
    heroKills: number;
    observerKills: number;
    sentryKills: number;
    roshanKills: number;
    necronomiconKills: number;
    ancientKills: number;
    buybackCount: number;
    observerUses: number;
    sentryUses: number;
    laneEfficiency: number;
    laneEfficiencyPct: number;
    lane: number;
    laneRole: number;
    isRoaming: boolean;
    purchaseTime: any;
    firstPurchaseTime: any;
    itemWin: any;
    itemUsage: any;
    purchaseTpScroll: any;
    actionsPerMin: number;
    lifeStateDead: number;
    rankTier: number;
    cosmetics: number[];
    benchmarks: any;
}
