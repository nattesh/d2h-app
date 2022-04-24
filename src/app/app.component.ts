import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SearchService} from './services/search.service';
import {Router} from '@angular/router';
import {routes} from './constants/routes.constant';
import {SettingsService} from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private settingsService: SettingsService,
    private statusBar: StatusBar,
    private searchService: SearchService,
    private router: Router
  ) {
    document.body.classList.toggle('dark', true);
    /*this.settingsService.getSetting(SettingsService.darkModeKey).then(
        setting => {
          document.body.classList.toggle('dark', setting === 'true');
          if (setting !== 'true') {
            this.statusBar.backgroundColorByHexString('#FFFFFF');
            this.statusBar.styleDefault();
          } else {
            this.statusBar.backgroundColorByHexString('#000000');
          }
        }
    );*/
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();

      this.searchService.getStoredUserId().then((data) => {
        if (data) {
          this.router.navigateByUrl(routes.pages.overview);
        } else {
            this.router.navigateByUrl(routes.search);
        }
      });
    });
  }

  ngOnInit() {
    /*const path = window.location.pathname.split('pages/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }*/
  }
}
