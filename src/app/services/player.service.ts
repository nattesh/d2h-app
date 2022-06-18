import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {odotaEndpoints} from '../constants/endpoints.constant';
import {map} from 'rxjs/operators';
import {DetailedPlayer, Player} from '../models/player.model';
import {Profile} from '../models/profile.model';
import {Friend} from '../models/friend.model';
import { PermanentBuff } from '../models/permanent-buff.model';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) {
    }

    getPlayerById(id: string) {
        return this.http.get(odotaEndpoints.players.getPlayerByUserId(id)).pipe(
            map(data => this.mapPlayerFromWS(data))
        );
    }

    getPlayerWl(id: string) {
        return this.http.get(odotaEndpoints.players.getPlayerWl(id));
    }

    getFriendsById(id: string) {
        return this.http.get(odotaEndpoints.players.getFriendsByUserId(id)).pipe(
            map(data => this.mapFriendArrayFromWS(data))
        );
    }

    getWordCloudByUser(userId: string) {
        return this.http.get(odotaEndpoints.players.wordCloud(userId));
    }

    mapPlayerFromWS(unparsed): Player {
        const player = new Player();
        player.trackedUntil = new Date(unparsed.tracked_until);
        player.soloCompetitiveRank = unparsed.solo_competitive_rank;

        player.profile = new Profile();
        player.profile.accountId = unparsed.profile.account_id;
        player.profile.personaName = unparsed.profile.personaname;
        player.profile.name = unparsed.profile.name;
        player.profile.plus = unparsed.profile.plus;
        player.profile.cheese = unparsed.profile.cheese;
        player.profile.steamId = unparsed.profile.steamid;
        player.profile.avatar = unparsed.profile.avatar;
        player.profile.avatarMedium = unparsed.profile.avatarmedium;
        player.profile.avatarFull = unparsed.profile.avatarfull;
        player.profile.profileUrl = unparsed.profile.profileurl;
        player.profile.lastLogin = new Date(unparsed.profile.last_login);
        player.profile.locCountryCode = unparsed.profile.loccountrycode;
        player.profile.isContributor = unparsed.profile.is_contributor;

        player.competitiveRank = unparsed.competitive_rank;
        player.rankTier = unparsed.rank_tier;
        player.leaderboardRank = unparsed.leaderboard_rank;
        player.mmrEstimate = unparsed.mmr_estimate;
        return player;
    }

    mapFriendArrayFromWS(array): any[] {
        const friends = [];
        for (const friend of array) {
            friends.push(this.mapFriendFromWS(friend));
        }
        return friends;
    }

    mapFriendFromWS(dFriend): Friend {
        const friend = new Friend();
        friend.accountId = dFriend.account_id;
        friend.lastPlayed = new Date(dFriend.last_player);
        friend.win = dFriend.win;
        friend.games = dFriend.games;
        friend.withWin = dFriend.with_win;
        friend.withGames = dFriend.with_games;
        friend.againstWin = dFriend.against_win;
        friend.againstGames = dFriend.against_games;
        friend.withGpmSum = dFriend.with_gpm_sum;
        friend.withXpmSum = dFriend.with_xpm_sum;
        friend.personaName = dFriend.personaname;
        friend.name = dFriend.name;
        friend.isContributor = dFriend.is_contributor;
        friend.lastLogin = new Date(dFriend.last_login);
        friend.avatar = dFriend.avatar;
        friend.avatarFull = dFriend.avatarfull;

        return friend;
    }

    mapDetailedPlayers(array): any[] {
        const finalArr = [];
        for (const dPlayer of array) {
            finalArr.push(this.mapSingleDetailedPlayer(dPlayer));
        }
        return finalArr;
    }

    mapPermanentBuff(dPermanentBuffs): PermanentBuff[] {

        const res = [];

        for(let dPermanentBuff of dPermanentBuffs) {
            const pf = new PermanentBuff;
            pf.permanentBuff = dPermanentBuff.permanent_buff;
            pf.stackCount = dPermanentBuff.stack_count;
            res.push(pf);
        }

        return res;
    }

    mapSingleDetailedPlayer(dPlayer): DetailedPlayer {
        const player = new DetailedPlayer();

        player.id = dPlayer.match_id;
        player.playerSlot = dPlayer.player_slot;
        player.abilityUpgradesArr = dPlayer.ability_upgrades_arr;
        player.abilityUses = dPlayer.ability_uses;
        player.abilityTargets = dPlayer.ability_targets;
        player.damageTargets = dPlayer.damage_targets;
        player.accountId = dPlayer.account_id;
        player.actions = dPlayer.actions;
        player.additionalUnits = dPlayer.additional_units;
        player.assists = dPlayer.assists;
        player.backpack0 = dPlayer.backpack_0;
        player.backpack1 = dPlayer.backpack_1;
        player.backpack2 = dPlayer.backpack_2;
        player.buybackLog = dPlayer.buyback_log;
        player.campsStacked = dPlayer.camps_stacked;
        player.connectionLog = dPlayer.connection_log;
        player.creepsStacked = dPlayer.creeps_stacked;
        player.damage = dPlayer.damage;
        player.damageInflictor = dPlayer.damage_inflictor;
        player.damageInflictorReceived = dPlayer.damage_inflictor_received;
        player.damageTaken = dPlayer.damage_taken;
        player.deaths = dPlayer.deaths;
        player.denies = dPlayer.denies;
        player.dnt = dPlayer.dn_t;
        player.gold = dPlayer.gold;
        player.goldPerMin = dPlayer.gold_per_min;
        player.goldReasons = dPlayer.gold_reasons;
        player.goldSpent = dPlayer.gold_spent;
        player.goldt = dPlayer.gold_t;
        player.heroDamage = dPlayer.hero_damage;
        player.heroHealing = dPlayer.hero_healing;
        player.heroHits = dPlayer.hero_hits;
        player.heroId = dPlayer.hero_id;
        player.item0 = dPlayer.item_0;
        player.item1 = dPlayer.item_1;
        player.item2 = dPlayer.item_2;
        player.item3 = dPlayer.item_3;
        player.item4 = dPlayer.item_4;
        player.item5 = dPlayer.item_5;
        player.itemNeutral = dPlayer.item_neutral;
        player.itemUses = dPlayer.item_uses;
        player.killStreaks = dPlayer.kill_streaks;
        player.killed = dPlayer.killed;
        player.killedBy = dPlayer.killed_by;
        player.kills = dPlayer.kills;
        player.killsLog = dPlayer.kills_log;
        player.lanePos = dPlayer.lane_pos;
        player.lastHits = dPlayer.last_hits;
        player.leaverStatus = dPlayer.leaver_status;
        player.level = dPlayer.level;
        player.lht = dPlayer.lh_t;
        player.lifeState = dPlayer.life_state;
        player.maxHeroHit = dPlayer.max_hero_hit;
        player.multiKills = dPlayer.multi_kills;
        player.netWorth = dPlayer.net_worth;
        player.obs = dPlayer.obs;
        player.obsLog = dPlayer.obs_log;
        player.senLog = dPlayer.sen_log;
        player.obsLeftLog = dPlayer.obs_left_log;
        player.obsPlaced = dPlayer.obs_placed;
        player.partyId = dPlayer.party_id;
        player.permanentBuffs = this.mapPermanentBuff(dPlayer.permanent_buffs);
        player.pings = dPlayer.pings;
        player.purchase = dPlayer.purchase;
        player.purchaseLog = dPlayer.purchase_log;
        player.runePickups = dPlayer.rune_pickups;
        player.runes = dPlayer.runes;
        player.runesLog = dPlayer.runes_log;
        player.sen = dPlayer.sen;
        player.senLeftLog = dPlayer.sen_left_log;
        player.senLog = dPlayer.sen_log;
        player.senPlaced = dPlayer.sen_placed;
        player.stuns = dPlayer.stuns;
        player.times = dPlayer.times;
        player.towerDamage = dPlayer.tower_damage;
        player.xpPerMin = dPlayer.xp_per_min;
        player.xpReasons = dPlayer.xp_reasons;
        player.xpt = dPlayer.xp_t;
        player.personaName = dPlayer.personaname;
        player.name = dPlayer.name;
        player.lastLogin = dPlayer.last_login;
        player.radiantWin = dPlayer.radiant_win;
        player.startTime = dPlayer.start_time;
        player.duration = dPlayer.duration;
        player.cluster = dPlayer.cluster;
        player.lobbyType = dPlayer.lobby_type;
        player.gameMode = dPlayer.game_mode;
        player.patch = dPlayer.patch;
        player.region = dPlayer.region;
        player.isRadiant = dPlayer.isRadiant;
        player.win = dPlayer.win;
        player.lose = dPlayer.lose;
        player.totalGold = dPlayer.total_gold;
        player.totalXp = dPlayer.total_xp;
        player.killsPerMin = dPlayer.kills_per_min;
        player.kda = dPlayer.kda;
        player.abandons = dPlayer.abandons;
        player.neutralKills = dPlayer.neutral_kills;
        player.towerKills = dPlayer.tower_kills;
        player.courierKills = dPlayer.courier_kills;
        player.laneKills = dPlayer.lane_kills;
        player.heroKills = dPlayer.hero_kills;
        player.observerKills = dPlayer.observer_kills;
        player.sentryKills = dPlayer.sentry_kills;
        player.roshanKills = dPlayer.roshan_kills;
        player.necronomiconKills = dPlayer.necronomicon_kills;
        player.ancientKills = dPlayer.ancient_kills;
        player.buybackCount = dPlayer.buyback_count;
        player.observerUses = dPlayer.observer_uses;
        player.sentryUses = dPlayer.sentry_uses;
        player.laneEfficiency = dPlayer.lane_efficiency;
        player.laneEfficiencyPct = dPlayer.lane_efficiency_pct;
        player.lane = dPlayer.lane;
        player.laneRole = dPlayer.lane_role;
        player.isRoaming = dPlayer.is_roaming;
        player.purchaseTime = dPlayer.purchase_time;
        player.firstPurchaseTime = dPlayer.first_purchase_time;
        player.itemWin = dPlayer.item_win;
        player.itemUsage = dPlayer.item_usage;
        player.purchaseTpScroll = dPlayer.purchase_tpscroll;
        player.actionsPerMin = dPlayer.actions_per_min;
        player.lifeStateDead = dPlayer.life_state_dead;
        player.rankTier = dPlayer.rank_tier;
        player.cosmetics = dPlayer.cosmetics;
        player.benchmarks = dPlayer.benchmarks;

        return player;
    }

}
