import { Component, OnInit } from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {routes} from '../constants/routes.constant';
import {ToolbarService} from '../services/toolbar.service';
import {SearchService} from '../services/search.service';
import {Player} from '../models/player.model';
import {PlayerService} from '../services/player.service';
import {ToastService} from '../services/toast.service';
import { OthersPopoverComponent } from '../components/others-popover/others-popover.component';
import { UtilService } from '../services/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-folder',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  player: Player;
  hideTabs = false;

  constructor(private searchService: SearchService,
              private toolbarService: ToolbarService,
              private playerService: PlayerService,
              private toastService: ToastService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private util: UtilService) { 

                this.activatedRoute.queryParams.subscribe( datas => {
                  this.searchService.getStoredUserId().then( id => {
                    this.hideTabs = id === null || id === undefined;
                  });
                })

                this.util.popoverRoleEmitter.subscribe( tab => {
                  if (tab === '/search') {
                    this.router.navigateByUrl(routes.search);
                  } else if(tab === 'logout') {
                    this.searchService.forgetUser().then( () =>
                      this.navCtrl.navigateRoot([routes.search])
                    );
                  } else if(tab === '/pages/credits') {
                    const opts = {} as NavigationOptions;
                    opts.queryParams = { asComponent: true };
                    this.navCtrl.navigateRoot([tab], opts);
                  } else {
                    this.navCtrl.navigateRoot([tab]);
                  }
                });
              }

  ngOnInit() {
    this.searchService.getStoredUserId().then(
        id => {
          if(id) {
            this.loadPlayer(id);
          } else {
            this.hideTabs = true;
          }
        }
    );
  }

  loadPlayer(id) {
    this.playerService.getPlayerById(id).subscribe(
        (data: Player) => {
          this.player = data;
        },
        () => {
          this.toastService.presentToast('User not found');
        });
  }

  goHome() {
    this.navCtrl.navigateRoot([routes.pages.overview]);
    //this.menu.toggle();
  }

  goSearch() {
    this.navCtrl.navigateRoot([routes.pages.search]);
    //this.menu.toggle();
  }

  getRankTier(rankTier) {
      const tier = rankTier.toString().charAt(0);
      return '.../../assets/rank_icons/rank_icon_' + tier + '.png';
  }

  getRankStars(rankTier) {
    const star = rankTier.toString().charAt(1);
    return '.../../assets/rank_icons/rank_star_' + star + '.png';
  }

  get toolbarTitle() {
    return this.toolbarService.getTitle();
  }

  async othersPopover(ev: Event) {
    this.util.popover = await this.popoverCtrl.create({
      component: OthersPopoverComponent,
      cssClass: 'popover-class',
      event: ev,
      translucent: true
    });
    await this.util.popover.present();
  }

}
