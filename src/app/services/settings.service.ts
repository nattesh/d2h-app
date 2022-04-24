import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    static darkModeKey = 'dark_mode';

    constructor(private storage: Storage) {
    }

    setSetting(key, value) {
        return this.storage.set(key, value);
    }

    getSetting(key) {
        return this.storage.get(key);
    }

}
