import {environment} from '../../environments/environment';

export const odotaEndpoints = {
    constants: {
        abilities: 'https://raw.githubusercontent.com/odota/dotaconstants/master/build/abilities.json',
        hero_abilities: 'https://raw.githubusercontent.com/odota/dotaconstants/master/build/hero_abilities.json',
        hero_names: 'https://raw.githubusercontent.com/odota/dotaconstants/master/build/hero_names.json',
        items: 'https://raw.githubusercontent.com/odota/dotaconstants/master/build/items.json',
        lore: 'https://raw.githubusercontent.com/odota/dotaconstants/master/build/hero_lore.json',
        permanent_buffs: 'https://raw.githubusercontent.com/odota/dotaconstants/master/build/permanent_buffs.json'
    },
    hero: {
        all: environment.base_odota_url + 'heroes',
        getHeroesByPlayer(playerId) {
            return environment.base_odota_url + '/players/' + playerId + '/heroes';
        }
    },
    match: {
        allMatches(userId: string, turbo: boolean) {
            return environment.base_odota_url + 'players/' + userId + '/matches' + (turbo ? '?significant=0' : '');
        },
        matchDetails(matchId: string) {
            return environment.base_odota_url + 'matches/' + matchId;
        },
        recentMatches(userId: string) {
            return environment.base_odota_url + 'players/' + userId + '/recentMatches';
        }
    },
    players: {
        refresh(userId: string) {
            return environment.base_odota_url + 'players/' + userId + '/refresh';
        },
        getFriendsByUserId(userId: string) {
            return environment.base_odota_url + 'players/' + userId + '/peers';
        },
        getPlayerByUserId(userId: string) {
            return environment.base_odota_url + 'players/' + userId;
        },
        getPlayerWl(userId: string) {
            return environment.base_odota_url + 'players/' + userId + '/wl';
        },
        wordCloud(userId) {
            return environment.base_odota_url + 'players/' + userId + '/wordcloud';
        }
    }
};

