import {Injectable} from '@angular/core';
import items from '../constants/items.json';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    static itemsObj;

    constructor(private util: UtilService) {
        this.initItemsJson();
    }

    getItemById(id) {
        let item;
        for(let k of Object.keys(ItemService.itemsObj)) {
            if(ItemService.itemsObj[k].id === id) {
                item = ItemService.itemsObj[k];
                break;
            }
        }
        return item;
    }

    getIteByName(name) {
        const item = items[name];
        return item;
    }

    getItemNameById(id) {
        let name;
        for(let k of Object.keys(items)) {
            if(items[k].id === id) {
                name = k;
                break;
            }
        }
        return name;
    }

    private initItemsJson() {
        if(!ItemService.itemsObj) {
            const json = this.util.keysToCamel(items);
            ItemService.itemsObj = json;
        } 
    }
}
