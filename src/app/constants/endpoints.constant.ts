import {environment} from '../../environments/environment';

export const odotaEndpoints = {
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
    },
    constants: {
        getConstants(resource) {
            return environment.base_odota_url + 'constants/' + resource;
        }
    }
};

