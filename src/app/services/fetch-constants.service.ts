import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { odotaEndpoints } from '../constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class FetchConstantsService {

  maxCounter = 0;
  counter = 0;

  allDone = new EventEmitter();

  constructor(private http: HttpClient, private storage: Storage) { }

  fetchConstants() {
    this.fetchBuffs();
    this.fetchAbilities();
    this.fetchHeroes();
    this.fetchLore();
    this.fetchHeroAbilities();
    this.fetchItems();
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

  private incrementCounter() {
    this.counter++;

    if(this.counter === this.maxCounter) {
      this.allDone.emit();
    }
  }
}
