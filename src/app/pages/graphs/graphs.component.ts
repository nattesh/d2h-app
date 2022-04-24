import { Component, Input, OnInit } from '@angular/core';
import { DetailedMatch } from 'src/app/models/match.model';
import { DetailedPlayer } from 'src/app/models/player.model';
import { HeroService } from 'src/app/services/hero.service';
import { ModalService } from 'src/app/services/modal.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {

  @Input('match') match: DetailedMatch;

  graphSelected: string = 'net';

  constructor(
    private heroService: HeroService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  changeGraph(e) {
    this.graphSelected = e.detail.value;
  }

  get sortedNet() {
    const items = this.getByField('netWorth');
    if(!items || items.length === 0) {
      return [];
    } else {
      return items.sort( (a, b) => {
        return a.val > b.val ? -1 : 1;
      })
    }
  }

  get sortedKills() {
    const items = this.getByField('kills');
    if(!items || items.length === 0) {
      return [];
    } else {
      return items.sort( (a, b) => {
        return a.val > b.val ? -1 : 1;
      })
    }
  }

  get sortedHd() {
    const items = this.getByField('heroDamage');
    if(!items || items.length === 0) {
      return [];
    } else {
      return items.sort( (a, b) => {
        return a.val > b.val ? -1 : 1;
      })
    }
  }

  get sortedTd() {
    const items = this.getByField('towerDamage');
    if(!items || items.length === 0) {
      return [];
    } else {
      return items.sort( (a, b) => {
        return a.val > b.val ? -1 : 1;
      })
    }
  }

  percent(val, type) {
    let res = 0;
    if(type === 'net') {
      res = val / this.sortedNet[0].val;
    } else if(type === 'kills') {
      res = val / this.sortedKills[0].val;
    } else if(type === 'hd') {
      res = val / this.sortedHd[0].val;
    } else if(type === 'td') {
      res = val / this.sortedTd[0].val;
    }
    return res;
  }

  getByField(field) {
    const heroesNet = [];
    const players = this.match.players;

    players.forEach( (p: DetailedPlayer) => {
      const it = {
        hero: this.heroService.getHeroById(p.heroId),
        isRadiant: p.isRadiant,
        val: p[field]
      }
      heroesNet.push(it);
    });
    return heroesNet;
  }

  openHeroDetailModal(heroId, event) {
    event.stopPropagation();
    this.modalService.openModal({
        component: HeroDetailComponent,
        componentProps: {
            heroId: Number.parseInt(heroId)
        }
    });
  }

}
