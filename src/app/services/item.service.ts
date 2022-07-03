import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    static items;
    static itemsObj;

    constructor(private util: UtilService, private storage: Storage) {
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

    getItemByName(name) {
        const item = ItemService.items[name];
        return item;
    }

    getItemNameById(id) {
        let name;
        for(let k of Object.keys(ItemService.items)) {
            if(ItemService.items[k].id === id) {
                name = k;
                break;
            }
        }
        return name;
    }

    private async initItemsJson() {
        ItemService.items = await this.storage.get('items');
        if(!ItemService.itemsObj) {
            const json = this.util.keysToCamel(ItemService.items);
            ItemService.itemsObj = json;
        } 
    }
}
