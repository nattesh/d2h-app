import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  popover: HTMLIonPopoverElement;

  popoverRoleEmitter = new EventEmitter();

  constructor() { }

  dismissPopover() {
    this.popover.dismiss()
  }

  toCamel(s: string) {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
}

  keysToCamel(o: any) {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
        const n = {};
        Object.keys(o)
            .forEach((k) => {
                n[this.toCamel(k)] = this.keysToCamel(o[k]);
            });
        return n;
    } else if (Array.isArray(o)) {
        return o.map((i) => {
            return this.keysToCamel(i);
        });
    }
    return o;
}
}
