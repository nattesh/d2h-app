import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { routes } from "src/app/constants/routes.constant";
import { ModalService } from "src/app/services/modal.service";
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

}
