import { Injectable } from "@angular/core";
import { UtilService } from "./util.service";
import { ItemService } from "./item.service";
import { Storage } from "@ionic/storage";

@Injectable({
    providedIn: 'root'
})
export class AbilityService {

    static buffs;
    static abilities;
    static buffsObj: any[];
    static abilitiesObj: any[];

    constructor(private util: UtilService, private storage: Storage) {
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

    async getAbilitiesConst() {
        return this.storage.get('abilities');
    }

    private async initBuffsJson() {
        AbilityService.buffs = await this.storage.get('buffs');
        if(!AbilityService.buffsObj) {
            const json = this.util.keysToCamel(AbilityService.buffs);
            AbilityService.buffsObj = json;
        } 
    }

    private async initAbilitiesJson() {
        AbilityService.abilities = await this.storage.get('abilities');
        if(!AbilityService.abilitiesObj) {
            const json = this.util.keysToCamel(AbilityService.abilities);
            AbilityService.abilitiesObj = json;
        } 
    }
}