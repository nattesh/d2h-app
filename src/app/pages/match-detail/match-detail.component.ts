import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchesService} from '../../services/matches.service';
import {DetailedMatch} from '../../models/match.model';
import {ToolbarService} from '../../services/toolbar.service';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit {

    @ViewChild('matchContainer', {static: false}) container: IonContent;

    matchId: string;
    detailedMatch: DetailedMatch;

    segment = 'overview';

    constructor(private activatedRoute: ActivatedRoute,
                private toolbarService: ToolbarService,
                private matchesService: MatchesService) {
        this.activatedRoute.queryParams.subscribe(
            (params) => {
                this.matchId = params.matchId;
                this.loadMatch();
            }
        );
    }

    ngOnInit() {
        this.matchesService.lastPlayerIsOpen.subscribe(() => {
            setTimeout(() => {
                this.scrollBottom();
            }, 500);
            
        })
    }

    ionViewWillEnter() {
        this.toolbarService.setTitle('Match Details');
    }

    loadMatch() {
        this.detailedMatch = undefined;
        this.matchesService.getMatchDetails(this.matchId).subscribe(
            (data: DetailedMatch) => {
                this.detailedMatch = data;
            }
        );
    }

    get match() {
        return this.detailedMatch;
    }

    get radiantTeam() {
        if (this.match) {
            return this.match.players.filter( player => {
                return player.isRadiant;
            });
        }
    }

    get direTeam() {
        if (this.match) {
            return this.match.players.filter( player => {
                return !player.isRadiant;
            });
        }
    }

    getDuration(duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration - (hours * 3600)) / 60);
        return '' + hours + 'h:' + minutes + 'm';
    }

    scrollBottom(){
        this.container.scrollToBottom(200);
    }

    changeSegment(e) {
        this.segment = e.detail.value;
    }
}
