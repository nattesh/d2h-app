import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {odotaEndpoints} from '../constants/endpoints.constant';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(
        private http: HttpClient,
        private storage: Storage) {
    }

    getUserByUserId(userId: string) {
        return this.http.get(odotaEndpoints.players.getPlayerByUserId(userId));
    }

    refreshUser(userId: string) {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        return this.http.post(odotaEndpoints.players.refresh(userId), undefined, {headers});
    }

    getStoredUserId() {
        return this.storage.get('user_id');
    }

    setStoredUserId(userid: string) {
        return this.storage.set('user_id', userid);
    }

    forgetUser() {
        return this.storage.clear();
    }
}
