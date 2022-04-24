import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Friend} from '../../models/friend.model';
import {ToolbarService} from '../../services/toolbar.service';
import {SearchService} from '../../services/search.service';
import {IonRefresher, NavController} from '@ionic/angular';
import {routes} from '../../constants/routes.constant';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {

    friends: Friend[];
    skeletonList: any;
    onLoading: boolean;

    @ViewChild('refresher', {static: false}) refresher: IonRefresher;

    constructor(
        private toolbarService: ToolbarService,
        private searchService: SearchService,
        private navCtrl: NavController,
        private playerService: PlayerService) {
        this.skeletonList = Array(10).fill({});
    }

    ngOnInit() {
        this.searchService.getStoredUserId().then(
            (id) => {
                this.loadFriends(id);
            }
        );
    }

    ionViewWillEnter() {
        this.toolbarService.setTitle('Friends');
    }

    loadFriends(id) {
        this.onLoading = true;
        this.playerService.getFriendsById(id).subscribe(
            (data: Friend[]) => {
                this.friends = data;

                if (this.refresher) {
                    this.refresher.complete();
                }

                this.onLoading = false;
            }
        );
    }

    getWinPercentage(friend: Friend) {
        return Math.round(friend.win * 10000 / friend.games) / 100;
    }

    getCountColor(percentage) {
        if (percentage > 50) {
            return 'win-color';
        } else if (percentage < 50) {
            return 'lose-color';
        }
    }

    getAvgGpm(friend) {
        return Math.round(friend.withGpmSum * 100 / friend.games) / 100;
    }

    getAvgXpm(friend) {
        return Math.round(friend.withXpmSum * 100 / friend.games) / 100;
    }

    doRefresh() {
        this.searchService.getStoredUserId().then(
            id => {
                this.loadFriends(id);
            }
        );
    }

    goToFriendOverview(userId) {
        this.navCtrl.navigateForward([routes.pages.overview], {queryParams: {userId}});
    }
}
