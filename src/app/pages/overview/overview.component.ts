import {Component, OnInit, ViewChild} from '@angular/core';
import {Match} from '../../models/match.model';
import {MatchesService} from '../../services/matches.service';
import {SearchService} from '../../services/search.service';
import {ToolbarService} from '../../services/toolbar.service';
import {IonRefresher, NavController, Platform} from '@ionic/angular';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../models/player.model';
import {ToastService} from '../../services/toast.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {routes} from '../../constants/routes.constant';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {ModalService} from '../../services/modal.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

    playerId: string;
    matches: Match[];
    player: Player;
    skeletonList: any[];
    loadingCount: number;
    playerWl: { win: number, lose: number };

    @ViewChild('refresher', {static: false}) refresher: IonRefresher;

    constructor(private matchesService: MatchesService,
                private toolbarService: ToolbarService,
                private toastService: ToastService,
                private playerService: PlayerService,
                private searchService: SearchService,
                private activatedRoute: ActivatedRoute,
                private modalService: ModalService,
                private router: Router,
                private navCtrl: NavController,
                private platform: Platform) {
        this.skeletonList = Array(20).fill({});
        this.activatedRoute.queryParams.subscribe(
            params => {
                if (params.userId) {
                    this.playerId = params.userId;
                    this.doRefresh();
                } else {
                    this.searchService.getStoredUserId().then(
                        id => {
                            if(id) {
                                this.playerId = id;
                                this.doRefresh();
                            }
                        }
                    );
                }
            }
        );
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        if (this.player) {
            this.toolbarService.setTitle(this.player.profile.personaName);
        } else {
            this.toolbarService.setTitle('Overview');
        }
        this.player = undefined;
        this.matches = undefined;
    }

    doRefresh() {
        this.player = undefined;
        this.matches = undefined;
        this.loadRecentMatches(this.playerId);
        this.loadPlayer(this.playerId);
        this.loadWl(this.playerId);
    }

    loadRecentMatches(id) {
        this.loadingCount++;
        this.matchesService.getRecentMatchesByUser(id).subscribe(
            (data: Match[]) => {
                this.matches = data;
                this.loadingCount--;

                if (this.refresher && !this.onLoading) {
                    this.refresher.complete();
                }
            },
            () => {
                this.toastService.presentToast('Unable to show recent matches');
            }
        );
    }

    loadPlayer(id) {
        this.loadingCount++;
        this.playerService.getPlayerById(id).subscribe(
            data => {
                this.player = data;
                this.loadingCount--;

                this.toolbarService.setTitle(this.player.profile.personaName);

                if (this.refresher && !this.onLoading) {
                    this.refresher.complete();
                }
            },
            (error: HttpErrorResponse) => {
                this.toastService.presentToast('Unable to find the player in OpenDota').finally(
                    () => {
                        if (!error.status) {
                            this.searchService.forgetUser().finally(
                                () => {
                                    this.goToLogin();
                                }
                            );
                        }
                    }
                );
            }
        );
    }

    goToLogin() {
        this.router.navigateByUrl(routes.search);
    }

    loadWl(id) {
        this.loadingCount++;
        this.playerService.getPlayerWl(id).subscribe(
            (data: { win: number, lose: number }) => {
                this.playerWl = data;
                this.loadingCount--;

                if (this.refresher && !this.onLoading) {
                    this.refresher.complete();
                }
            },
            () => {
                this.toastService.presentToast('Error loading stats');
            }
        );
    }

    get onLoading() {
        return this.loadingCount === 0;
    }

    get recentlyLogged() {
        if (this.player) {
            const secondPast = (new Date().getTime() - this.player.profile.lastLogin.getTime()) / 1000;
            return secondPast < 3600;
        }
        return false;
    }

    getRankTier(rankTier) {
        const tier = rankTier.toString().charAt(0);
        return '.../../assets/rank_icons/rank_icon_' + tier + '.png';
    }

    getRankStars(rankTier) {
        const star = rankTier.toString().charAt(1);
        return '.../../assets/rank_icons/rank_star_' + star + '.png';
    }

    getWlPercentage() {
        const total = this.playerWl.win + this.playerWl.lose;
        return Math.round(this.playerWl.win * 10000 / total) / 100 + '%';
    }

    tierImgClass() {
        if (this.platform.width() > this.platform.height()) {
            return 'tier-img-landscape';
        } else {
            return 'tier-img';
        }
    }

    getDuration(duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration - (hours * 3600)) / 60);
        return '' + hours + 'h:' + minutes + 'm';
    }

    resultClass(match: Match) {
        if ((match.isRadiant && match.radiantWin) || (!match.isRadiant && !match.radiantWin)) {
            return 'img-green';
        } else {
            return 'img-red';
        }
    }

    goToMatchDetail(matchId) {
        let params: NavigationExtras;
        params = {queryParams: {matchId}};
        this.router.navigate([routes.pages.matchDetails], params);
    }

    openHeroDetailModal(heroId, event) {
        event.stopPropagation();
        this.modalService.openModal({
            component: HeroDetailComponent,
            componentProps: {
                heroId
            }
        });
    }

    openDotaUrl() {
        return 'https://www.opendota.com/players/' + this.playerId;
    }

    refreshMatches() {
        this.searchService.refreshUser(this.playerId).subscribe(
            data => {
                this.toastService.presentToast('Refreshed: ' + data['length'] + ' matches');
            }, () => {
                this.toastService.presentToast('An error occured refreshing your matches');
            }
        );
    }

    ionViewWillLeave() {
        this.matches = undefined;
    }
}
