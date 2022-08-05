import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {NavigationExtras, Router} from '@angular/router';
import {routes} from '../constants/routes.constant';
import {ToastService} from '../services/toast.service';
import {InAppBrowserObject} from '@ionic-native/in-app-browser/ngx';
import {ModalService} from '../services/modal.service';
import {CreditsComponent} from '../pages/credits/credits.component';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Patch } from '../models/patch.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

    inputStr: string;
    inputMatch: string;
    defaultCheck = false;
    loading: boolean;
    saveUser: false;
    browser: InAppBrowserObject;

    patch: string;

    constructor(
        private searchService: SearchService,
        private toastService: ToastService,
        private navCtrl: NavController,
        private modalService: ModalService,
        private storage: Storage,
        private router: Router) { }

    ngOnInit() {
        this.loadPatch();
    }

    loadPatch() {
        this.storage.get('patch').then((patches: Patch[]) => {
            console.log(patches);
            const lastPatch = patches[patches.length - 1];
            this.patch = lastPatch.name;
        })
    }

    searchPlayer() {
        this.loading = true;
        
        const idNum = Number.parseFloat(this.inputStr);
        const try32 = (idNum - 76561197960265728);
        if (try32 > 0) {
            this.loading = false;
            this.toastService.presentToast('Enter the 32bit player ID');
        } else {
            this.submit(idNum.toString());
        }
    }

    searchMatch() {
        let params: NavigationExtras;
        params = {queryParams: {matchId: this.inputMatch}};
        this.router.navigate([routes.pages.matchDetails], params);
    }

    submit(userId: string) {
        this.loading = true;
        /*this.loginService.refreshUser(userid).subscribe(
            refData => {*/
        this.searchService.getUserByUserId(userId).subscribe(
            data => {
                if (data) {
                    if(this.defaultCheck) {
                        this.searchService.setStoredUserId(userId).then(
                            () => this.navCtrl.navigateRoot(routes.pages.overview, {queryParams: {default: true}})
                        );
                    } else {
                        this.navCtrl.navigateRoot([routes.pages.overview], {queryParams: {userId}});
                    }
                } else {
                    this.toastService.presentToast('Generic error');
                    this.loading = false;
                    this.saveUser = false;
                }
            },
            (e) => {
                console.log(e);
                this.loading = false;
                this.toastService.presentToast('Error: it seems that your user isn\'t on openDota services');
                this.saveUser = false;
            },
            () => {
                this.loading = false;
            }
            /*);*/
            /*},
            () => {
                this.loading = false;
                this.toastService.presentToast('Error: can\'t log in');
                this.saveUser = false;
            }*/
        );
    }

    showCredits() {
        this.modalService.openModal({
            component: CreditsComponent
        });
    }

}
