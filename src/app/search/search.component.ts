import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {NavigationExtras, Router} from '@angular/router';
import {routes} from '../constants/routes.constant';
import {SettingsService} from '../services/settings.service';
import {ToastService} from '../services/toast.service';
import {InAppBrowser, InAppBrowserObject} from '@ionic-native/in-app-browser/ngx';
import {ModalService} from '../services/modal.service';
import {CreditsComponent} from '../pages/credits/credits.component';
import { NavController } from '@ionic/angular';

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

    constructor(
        private searchService: SearchService,
        private toastService: ToastService,
        private navCtrl: NavController,
        private modalService: ModalService,
        private router: Router) { }

    ngOnInit() {
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
                            () => this.router.navigateByUrl(routes.pages.overview, {queryParams: {default: true}})
                        );
                    } else {
                        this.navCtrl.navigateForward([routes.pages.overview], {queryParams: {userId}});
                    }
                } else {
                    this.toastService.presentToast('Generic error');
                    this.loading = false;
                    this.saveUser = false;
                }
            },
            () => {
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
