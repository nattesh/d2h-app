import { Injectable } from "@angular/core";
import buffs from '../constants/permanent_buffs.json';
import abilities from '../constants/abilities.json';
import { UtilService } from "./util.service";
import { ItemService } from "./item.service";

@Injectable({
    providedIn: 'root'
})
export class AbilityService {

    static buffsObj: any[];
    static abilitiesObj: any[];

    constructor(private util: UtilService, private itemService: ItemService) {
        this.initAbilitiesJson();
        this.initBuffsJson();
    }

    getNameFromBuffId(buffId): string {
        return AbilityService.buffsObj[buffId];
    }

    getBuffByName(name): {img: string, type: string} {
        const ccName = this.util.toCamel(name);
        const ability = AbilityService.abilitiesObj[ccName];
        if(ability) {
            return {
                img: ability.img,
                type: 'ability'
            };
        }
        const item = ItemService.itemsObj[ccName];
        if(item) {
            return {
                img: item.img,
                type: 'item'
            };
        }
        return undefined;
    }

    private initBuffsJson() {
        if(!AbilityService.buffsObj) {
            const json = this.util.keysToCamel(buffs);
            AbilityService.buffsObj = json;
        } 
    }

    private initAbilitiesJson() {
        if(!AbilityService.abilitiesObj) {
            const json = this.util.keysToCamel(abilities);
            AbilityService.abilitiesObj = json;
        } 
    }
}