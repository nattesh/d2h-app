import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { odotaEndpoints } from '../constants/endpoints.constant';
import { Patch } from '../models/patch.model';

@Injectable({
  providedIn: 'root'
})
export class FetchConstantsService {

  maxCounter = 0;
  counter = 0;

  allDone = new EventEmitter();

  constructor(private http: HttpClient, private storage: Storage) { }

  async fetchConstants() {
    await this.cleanConstants();
    this.fetchBuffs();
    this.fetchAbilities();
    this.fetchHeroes();
    this.fetchLore();
    this.fetchHeroAbilities();
    this.fetchItems();
  }

  getPatchFromStorage() {
    return this.storage.get('patch');
  }

  getPatchFromApi(): Observable<Patch[]> {
    return this.http.get<Patch[]>(odotaEndpoints.constants.patch);
  }

  private fetchBuffs() {
    this.maxCounter++;
    this.http.get(odotaEndpoints.constants.permanent_buffs).subscribe(buffs => {
        this.storage.set('buffs', buffs).then(() => this.incrementCounter());
    });
  }

  private fetchAbilities() {
    this.maxCounter++;
    this.http.get(odotaEndpoints.constants.abilities).subscribe(abilities => {
        this.storage.set('abilities', abilities).then(() => this.incrementCounter());
    });
  }

  private fetchHeroes() {
    this.maxCounter++;
    this.http.get(odotaEndpoints.constants.hero_names).subscribe(heroes => {
        this.storage.set('heroes', heroes).then(() => this.incrementCounter());
    });
  }

  private fetchLore() {
  this.maxCounter++;
    this.http.get(odotaEndpoints.constants.lore).subscribe(lore => {
        this.storage.set('lore', lore).then(() => this.incrementCounter());
    });
  }

  private fetchHeroAbilities() {
    this.maxCounter++;
    this.http.get(odotaEndpoints.constants.hero_abilities).subscribe(heroAbilities => {
       this.storage.set('heroAbilities', heroAbilities).then(() => this.incrementCounter());
    });
  }

  private fetchItems() {
    this.maxCounter++;
    this.http.get(odotaEndpoints.constants.items).subscribe(items => {
        this.storage.set('items', items).then(() => this.incrementCounter());
    });
  }

  private async cleanConstants() {
    await this.storage.remove('buffs');
    await this.storage.remove('abilities');
    await this.storage.remove('heroes');
    await this.storage.remove('lore');
    await this.storage.remove('heroAbilities');
    await this.storage.remove('items');
  }

  private incrementCounter() {
    this.counter++;

    if(this.counter === this.maxCounter) {
      this.allDone.emit();
    }
  }
}
