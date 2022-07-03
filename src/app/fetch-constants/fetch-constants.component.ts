import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { routes } from 'src/app/constants/routes.constant';
import { FetchConstantsService } from 'src/app/services/fetch-constants.service';
import { SearchService } from 'src/app/services/search.service';
import { Patch } from '../models/patch.model';

@Component({
  selector: 'app-fetch-constants',
  templateUrl: './fetch-constants.component.html',
  styleUrls: ['./fetch-constants.component.scss'],
})
export class FetchConstantsComponent implements OnInit {

  fetchMsg = 'Fetching patch notes ';

  constructor(
    private fetchService: FetchConstantsService,
    private navCtrl: NavController,
    private storage: Storage,
    private searchService: SearchService) { }

  ngOnInit() {
    this.loadPatchAndInit();
    this.fetchService.allDone.subscribe(() => {
      this.initApp();
    });

    setInterval(() => {
      if(this.fetchMsg === 'Fetching patch notes ...') {
        this.fetchMsg = 'Fetching patch notes ';
      } else {
        this.fetchMsg += '.';
      }
    }, 300);
  }

  async loadPatchAndInit() {
    const localPatch = await this.fetchService.getPatchFromStorage();
    
    if(!localPatch) {
      this.fetchService.getPatchFromApi().subscribe(patches => {
        this.storage.set('patch', patches).then( () => {
          this.fetchConstantsAndInit();
        });
      });
    } else {
      this.fetchService.getPatchFromApi().subscribe((patches: Patch[]) => {
        const localLast = localPatch[localPatch.length - 1];
        const apiLast = patches[patches.length - 1];
        console.log(localLast, localLast.name);
        if(localLast.id !== apiLast.id) {
          this.fetchConstantsAndInit();
        } else {
          this.initApp();
        }
      });
    }
  }

  fetchConstantsAndInit() {
    this.fetchService.fetchConstants();
  }

  initApp() {
    this.searchService.getStoredUserId().then((data) => {
      if (data) {
        this.navCtrl.navigateRoot(routes.pages.overview);
      } else {
        this.navCtrl.navigateRoot(routes.search);
      }
    });
  }

}
