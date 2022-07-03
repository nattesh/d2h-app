import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Hero} from '../../models/hero.model';
import {ModalService} from '../../services/modal.service';
import { AbilityService } from 'src/app/services/ability.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {

  @Input() heroId: number;
  hero: Hero;
  heroLore: string;
  abilities: any[];

  constructor(private heroService: HeroService,
              private abilityService: AbilityService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.hero = this.heroService.getHeroById(this.heroId);
    this.getHeroLoreByHero(this.hero.name);
    this.initAbilities();
  }

  initAbilities() {
    this.abilityService.getAbilitiesConst().then((abilitiesConts) => {
      this.abilities = this.getAbilitiesByHeroName(abilitiesConts, this.hero.name);
    });
  }

  getAbilitiesByHeroName(abilitiesConst, name: string): any[] {
    const abs = HeroService.heroAbilities[name].abilities;
    const abilitiesObj = [];

   for (const ability of abs) {
      if (ability !== 'generic_hidden') {
        abilitiesObj.push(abilitiesConst[ability]);
      }
    }
    return abilitiesObj;
  }

  closeModal() {
    this.modalService.closeModal();
  }

  getHeroLoreByHero(name) {
    const shortened = name.replace('npc_dota_hero_', '');
    this.heroLore = HeroService.lore[shortened];
  }

  byHeroPrimaryAttr(attr: string) {
    if (attr === 'str') {
      return 'hero-str';
    }
    if (attr === 'agi') {
      return 'hero-dex';
    }
    if (attr === 'int') {
      return 'hero-int';
    }
  }

  getHeaderClass() {
    const attr = this.hero.primaryAttr;

    if (attr === 'str') {
      return 'toolbar-str';
    }
    if (attr === 'agi') {
      return 'toolbar-dex';
    }
    if (attr === 'int') {
      return 'toolbar-int';
    }
  }

  toggleAbilityDetails(slot) {
    const detail = document.getElementById('ability_details_' + slot);
    const className = detail.className;
    if (className === 'accordion-details') {
      detail.setAttribute('class', 'close-details');
    } else {
      detail.setAttribute('class', 'accordion-details');
    }
  }

  showDefaultImg(elem) {
    elem.src = '../../../assets/no_img.png';
  }

  getVideoUrl(imgPath) {
    return imgPath.replace('/apps/dota2/images/dota_react/heroes/', '/apps/dota2/videos/dota_react/heroes/renders/')
  }

}
