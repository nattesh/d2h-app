import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {HeroService} from '../../services/hero.service';
import {IonContent, IonRefresher} from '@ionic/angular';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {ModalService} from '../../services/modal.service';
import {ToolbarService} from '../../services/toolbar.service';
import {NavigationExtras, Router} from '@angular/router';
import {routes} from '../../constants/routes.constant';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {

    skeletonList: any[];
    heroes: any[];
    loadingCount: number;
    maxIndex: number;

    @ViewChild('refresher', {static: false}) refresher: IonRefresher;
    @ViewChild(IonContent, {static: false}) content: IonContent;

    constructor(
        private searchService: SearchService,
        private heroService: HeroService,
        private modalService: ModalService,
        private router: Router,
        private toolbarService: ToolbarService
    ) { }

    ngOnInit() {
        this.doRefresh();
    }

    ionViewWillEnter() {
        this.toolbarService.setTitle('Heroes');
        this.maxIndex = 20;
    }

    doRefresh() {
        this.maxIndex = 20;
        this.searchService.getStoredUserId().then(
            (id) => {
                this.loadHeroes(id);
            }
        );
    }

    loadHeroes(id) {
        this.loadingCount++;
        this.heroService.getAllHeroesByPlayer(id).subscribe(
            data => {
                this.heroes = data;
                this.loadingCount--;

                if (this.refresher && !this.onLoading) {
                    this.refresher.cancel();
                }
            }
        );
    }

    addHeroes(event) {
        this.maxIndex += 20;
        event.target.complete();
    }

    get partialHeroes() {
        return this.heroes.filter( (a, i) => {
            return i < this.maxIndex + 1;
        });
    }

    getCompositeHero(id) {
        return this.heroService.getHeroById(Number.parseInt(id));
    }

    returnTop() {
        this.content.scrollToTop(500).then(
            () => {
                this.maxIndex = 20;
            }
        );
    }

    get onLoading() {
        return this.loadingCount > 0;
    }

    openHeroDetailModal(heroId, event) {
        event.stopPropagation();
        this.modalService.openModal({
            component: HeroDetailComponent,
            componentProps: {
                heroId: Number.parseInt(heroId)
            }
        });
    }

    getWlPercentage(w: number, l: number) {
        const total = w + l;
        return Math.round(w * 10000 / total) / 100 + '%';
    }

    goToMatches(heroId) {
        let params: NavigationExtras;
        params = { queryParams: {heroId} };
        this.router.navigate([routes.pages.matches], params);
    }

}
