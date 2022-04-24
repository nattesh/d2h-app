import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from '../models/hero.model';
import {odotaEndpoints} from '../constants/endpoints.constant';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { UtilService } from './util.service';
import heroes from '../constants/hero_names.json';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    static heroesObj: any[];

    constructor(private http: HttpClient,
        private util: UtilService) {
            this.initHeroJson();
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

    private initHeroJson() {
        if(!HeroService.heroesObj) {
            const json = this.util.keysToCamel(heroes);
            HeroService.heroesObj = json;
        } 
    }
}
