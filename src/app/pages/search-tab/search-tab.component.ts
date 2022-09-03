import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { routes } from "src/app/constants/routes.constant";
import { Patch } from "src/app/models/patch.model";
import { SearchService } from "src/app/services/search.service";
import { ToastService } from "src/app/services/toast.service";


@Component({
    selector: 'app-search-tab',
    templateUrl: './search-tab.component.html',
    styleUrls: ['./search-tab.component.scss'],
})
export class SearchTabComponent implements OnInit {

    inputStr: string;
    inputMatch: string;
    defaultCheck = false;
    loading: boolean;
    saveUser: false;

    patch: string;

    constructor(
        private searchService: SearchService,
        private toastService: ToastService,
        private navCtrl: NavController,
        private storage: Storage,
        private router: Router) { }

    ngOnInit() {
        this.loadPatch();
    }

    loadPatch() {
        this.storage.get('patch').then((patches: Patch[]) => {
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

    checkUpdates() {
        this.navCtrl.navigateRoot(routes.fetch);
    }

}
