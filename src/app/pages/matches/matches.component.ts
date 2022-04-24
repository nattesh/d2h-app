import {Component, OnInit, ViewChild} from '@angular/core';
import {MatchesService} from '../../services/matches.service';
import {IonContent, IonRefresher} from '@ionic/angular';
import {Match} from '../../models/match.model';
import {SearchService} from '../../services/search.service';
import {ToolbarService} from '../../services/toolbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {routes} from '../../constants/routes.constant';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {ModalService} from '../../services/modal.service';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {

    skeletonList: any[];
    unfilteredMatches: Match[];
    loadingCount: number;
    maxIndex: number;

    turbo = true;

    filterHeroId: number;
    filterHeroName: string;

    @ViewChild('refresher', {static: false}) refresher: IonRefresher;
    @ViewChild(IonContent, {static: false}) content: IonContent;

    constructor(private matchesService: MatchesService,
                private toolbarService: ToolbarService,
                private heroService: HeroService,
                private router: Router,
                private modalService: ModalService,
                private activatedRoute: ActivatedRoute,
                private searchService: SearchService) {
        this.skeletonList = Array(20).fill({});

        this.activatedRoute.queryParamMap.subscribe(
            params => {
                if (params.get('heroId')) {
                    this.filterHeroId = Number.parseInt(params.get('heroId'), 10);
                    this.filterHeroName = this.heroService.getHeroById(this.filterHeroId).localizedName;
                }
            }
        );
    }

    ionViewWillEnter() {
        this.toolbarService.setTitle('Matches');
        this.maxIndex = 20;
    }

    ngOnInit() {
        this.doRefresh();
    }

    doRefresh() {
        this.maxIndex = 20;
        this.searchService.getStoredUserId().then(
            (id) => {
                this.loadMatches(id);
            }
        );
    }

    loadMatches(id) {
        this.loadingCount++;
        this.matchesService.getAllMatchesByUser(id, this.turbo).subscribe(
            data => {
                this.unfilteredMatches = data;
                this.loadingCount--;

                if (this.refresher && !this.onLoading) {
                    this.refresher.cancel();
                }
            }
        );
    }

    addMatches(event) {
        this.maxIndex += 20;
        event.target.complete();
    }

    returnTop() {
        this.content.scrollToTop(500).then(
            () => {
                this.maxIndex = 20;
            }
        );
    }

    get matches() {
        if (!this.filterHeroId || !this.unfilteredMatches) {
            return this.unfilteredMatches;
        } else {
            return this.unfilteredMatches.filter(it => {
                return it && it.hero && it.hero.id === this.filterHeroId;
            });
        }
    }

    get partialMatches() {
        return this.matches.filter( (a, i) => {
            return i < this.maxIndex + 1;
        });
    }

    get onLoading() {
        return this.loadingCount > 0;
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

    goToMatchDeatils(matchId) {
        this.router.navigate([routes.pages.matchDetails], {queryParams: {matchId}});
    }

    filterByHero(slidingItem, match?: Match) {
        if (match) {
            this.filterHeroId = match.hero.id;
            this.filterHeroName = match.hero.localizedName;
            this.returnTop();
        } else {
            this.filterHeroId = undefined;
            this.filterHeroName = undefined;
        }
        slidingItem.close();
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

    toggleTurbo(e) {
        this.unfilteredMatches = [];
        this.turbo = e.detail.checked;
        this.doRefresh();
    }
}
