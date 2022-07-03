import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/constants/routes.constant';
import { FetchConstantsService } from 'src/app/services/fetch-constants.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-fetch-constants',
  templateUrl: './fetch-constants.component.html',
  styleUrls: ['./fetch-constants.component.scss'],
})
export class FetchConstantsComponent implements OnInit {

  fetchMsg = 'Fetching patch notes ';

  constructor(private fetchService: FetchConstantsService, private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    this.fetchService.fetchConstants();
    this.fetchService.allDone.subscribe(() => {
      this.searchService.getStoredUserId().then((data) => {
        if (data) {
          this.router.navigateByUrl(routes.pages.overview);
        } else {
            this.router.navigateByUrl(routes.search);
        }
      });
    });

    setInterval(() => {
      if(this.fetchMsg === 'Fetching patch notes ...') {
        this.fetchMsg = 'Fetching patch notes ';
      } else {
        this.fetchMsg += '.';
      }
    }, 300);

  }

}
