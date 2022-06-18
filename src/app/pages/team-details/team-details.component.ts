import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {lanes} from '../../constants/codings.contants';
import {routes} from '../../constants/routes.constant';
import {Router} from '@angular/router';
import {DetailedPlayer} from '../../models/player.model';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {ModalService} from '../../services/modal.service';
import {ItemDetailComponent} from '../item-detail/item-detail.component';
import {ItemService} from '../../services/item.service';
import { HeroService } from 'src/app/services/hero.service';
import { AbilityService } from 'src/app/services/ability.service';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {

  @Input() team: DetailedPlayer[];

  constructor(private router: Router,
              private itemService: ItemService,
              private heroService: HeroService,
              private modalService: ModalService,
              private abilityService: AbilityService,
              private matchService: MatchesService) { }

  ngOnInit() {}

  openHeroDetailModal(heroId, event) {
    event.stopPropagation();
    this.modalService.openModal({
      component: HeroDetailComponent,
      swipeToClose: true,
      componentProps: {
        heroId
      }
    });
  }

  openItemDetailModal(itemId, event) {
    event.stopPropagation();
    if (itemId) {
      this.modalService.openModal({
        component: ItemDetailComponent,
        swipeToClose: true,
        componentProps: {
          itemId
        }
      });
    }
  }

  getHeroAvatarById(id): any {
    const hero = this.heroService.getHeroById(id);
    if (hero) {
      return hero.img;
    }
  }

  getLaneDescription(player) {
    return lanes[player.laneRole] ? lanes[player.laneRole].name : '-';
  }

  goToPlayerOverview(userId) {
    if (userId) {
      this.router.navigate([routes.pages.overview], {queryParams: {userId}});
    }
  }

  togglePlayerDetails(slot) {
    const detail = document.getElementById('player_details_' + slot);
    const className = detail.className;
    if (className === 'accordion-details') {
      detail.setAttribute('class', 'close-details');
    } else {
      detail.setAttribute('class', 'accordion-details');
      if(slot === 132) {
        this.matchService.openLast();
      }
    }
  }


  getItemImage(itemId) {

    if(!itemId) {
      return undefined;
    }

    const item = this.itemService.getItemById(itemId);

    if(item) {
      return 'https://cdn.cloudflare.steamstatic.com' + item.img;
    } else {
      return undefined;
    }

  }

  getBuffById(id) {
    const name = this.abilityService.getNameFromBuffId(id);
    const buff = this.abilityService.getBuffByName(name);
    return buff;
  }

  getBuffImgByBuffId(id) {
    const buff = this.getBuffById(id);
    return 'https://cdn.cloudflare.steamstatic.com' + buff.img;;
  }

  handleBuffClick(id, e) {
    const buff = this.getBuffById(id);
    const name = this.abilityService.getNameFromBuffId(id);
    if(buff.type === 'item') {
      const item = this.itemService.getItemByName(name);
      this.openItemDetailModal(item.id, e);
    }
    
  }

  getBuyTime(index, itemId) {
    const seconds = this.getPurchaseLog(index, itemId);
    if (seconds) {
      const minutes = Math.floor(seconds / 60);
      const remSecs = seconds - minutes * 60;

      const strMin = minutes > 9 || minutes < 0 ? minutes : '0' + minutes;
      const strSec = remSecs > 9 ? remSecs : '0' + remSecs;

      return strMin + ':' + strSec;
    }
  }

  getPurchaseLog(index, itemId) {
    if(itemId === 0) {
      return; 
    }
    const player = this.team[index];
    if (player.purchaseLog) {
      const itemName = this.itemService.getItemNameById(itemId);
      const purchase = player.purchaseLog.find(it => {
        return it.key === itemName;
      });
      if (purchase) {
        return purchase.time;
      }
    }
  }

  showDefaultImg(elem) {
    elem.src = '../../../assets/no_img.png';
  }

}
