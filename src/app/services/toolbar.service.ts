import {Injectable} from '@angular/core';

@Injectable()
export class ToolbarService {

    private title = 'Dota 2 Handbook';

    setTitle(title: string) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

}
