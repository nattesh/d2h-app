import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Hero} from '../../models/hero.model';
import lore from '../../constants/lore.json';
import {ModalService} from '../../services/modal.service';
import heroAbilities from '../../constants/hero_abilities.json';
import abilities from '../../constants/abilities.json';

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
              private modalService: ModalService) { }

  ngOnInit() {
    this.hero = this.heroService.getHeroById(this.heroId);
    this.getHeroLoreByHero(this.hero.name);
    this.abilities = this.getAbilitiesByHeroName(this.hero.name);
  }

  getAbilitiesByHeroName(name: string): any[] {
    const abs = heroAbilities[name].abilities;
    const abilitiesObj = [];

   for (const ability of abs) {
      if (ability !== 'generic_hidden') {
        abilitiesObj.push(abilities[ability]);
      }
    }
    return abilitiesObj;
  }

  closeModal() {
    this.modalService.closeModal();
  }

  getHeroLoreByHero(name) {
    const shortened = name.replace('npc_dota_hero_', '');
    this.heroLore = lore[shortened];
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
