import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from '../models/hero.model';
import {odotaEndpoints} from '../constants/endpoints.constant';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { UtilService } from './util.service';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    static heroes;
    static lore;
    static heroAbilities;
    static heroesObj: any[];

    constructor(
        private storage: Storage,
        private http: HttpClient,
        private util: UtilService) {
            this.initHeroJson();
            this.initLore();
            this.initHeroAbilities();
    }

    getHeroById(id: number): Hero {
        let hero;
        for(let k of Object.keys(HeroService.heroesObj)) {
            if(HeroService.heroesObj[k].id === id) {
                hero = HeroService.heroesObj[k];
                break;
            }
        }
        return hero;
    }

    getAllHeroesByPlayer(playerId): Observable<any[]> {
        return this.http.get<any[]>(odotaEndpoints.hero.getHeroesByPlayer(playerId)).pipe(
            map( it => {
                return this.util.keysToCamel(it);
            })
        );
    }

    private async initHeroJson() {
        HeroService.heroes = await this.storage.get('heroes');
        if(!HeroService.heroesObj) {
            const json = this.util.keysToCamel(HeroService.heroes);
            HeroService.heroesObj = json;
        } 
    }

    private async initLore() {
        HeroService.lore = await this.storage.get('lore');
    }

    private async initHeroAbilities() {
        HeroService.heroAbilities = await this.storage.get('heroAbilities');
    }
}
