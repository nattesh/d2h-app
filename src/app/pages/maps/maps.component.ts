import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DetailedMatch } from 'src/app/models/match.model';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  rSelected: any = 'all';
  dSelected: any = 'all';

  rWardList = [];
  rSenList = [];
  dWardList = [];
  dSenList = [];

  width;

  showRWard = true;
  showRSen = true;
  showDWard = true;
  showDSen = true;

  timeFilter;

  @Input('match') match: DetailedMatch;

  constructor(
    private heroService: HeroService,
    private platform: Platform
  ) { 
    this.platform.ready().then(() => {
      this.width = platform.width();
    });
  }

  ngOnInit() {
    setTimeout( () => {
      this.updateRWardList();
      this.updateRSenList();
      this.updateDWardList();
      this.updateDSenList();
    }, 200);
    
  }

  getHeroById(id) {
    return this.heroService.getHeroById(id);
  }

  get radiants() {
    if(this.match) {
      return this.match.players.filter(p => p.isRadiant);
    }
    return [];
  }

  get dires() {
    if(this.match) {
      return this.match.players.filter(p => !p.isRadiant);
    }
    return [];
  }

  get filteredShowRWard() {
    if(this.showRWard) {
      return this.rWardList.filter(w => {
        if(this.timeFilter !== undefined) {
          return this.timeFilter >= w.time && this.timeFilter < (w.time + 360)
        } else {
          return true;
        }
      });
    } else {
      return [];
    }
  }

  get filteredShowRSen() {
    if(this.showRSen) {
      return this.rSenList.filter(w => {
        if(this.timeFilter !== undefined) {
          return this.timeFilter >= w.time && this.timeFilter < (w.time + 420)
        } else {
          return true;
        }
      });
    } else {
      return [];
    }
  }

  get filteredShowDWard() {
    if(this.showDWard) {
      return this.dWardList.filter(w => {
        if(this.timeFilter !== undefined) {
          return this.timeFilter >= w.time && this.timeFilter < (w.time + 360)
        } else {
          return true;
        }
      });
    } else {
      return [];
    }
  }

  get filteredShowDSen() {
    if(this.showDSen) {
      return this.dSenList.filter(w => {
        if(this.timeFilter !== undefined) {
          return this.timeFilter >= w.time && this.timeFilter < (w.time + 420)
        } else {
          return true;
        }
      });
    } else {
      return [];
    }
  }

  changeRPlayer(e) {
    this.rWardList = [];
    this.rSenList = [];
    this.rSelected = e.detail.value ;
    this.updateRWardList(this.rSelected);
    this.updateRSenList(this.rSelected);
  }

  changeDPlayer(e) {
    this.dWardList = [];
    this.dSenList = [];
    this.dSelected = e.detail.value;
    this.updateDWardList(this.dSelected);
    this.updateDSenList(this.dSelected);
  }

  updateRWardList(filterId?) {
    filterId = filterId === 'all' ? undefined : filterId;
    this.match.players.forEach(p => {
      if(p.isRadiant) {
        if(filterId) {
          if(filterId == p.heroId) {
            this.rWardList.push(...p.obsLog);
          }
        } else {
          this.rWardList.push(...p.obsLog);
        }
      };
    });
  }

  updateRSenList(filterId?) {
    filterId = filterId === 'all' ? undefined : filterId;
    this.match.players.forEach(p => {
      if(p.isRadiant) {
        if(filterId) {
          if(filterId == p.heroId) {
            this.rSenList.push(...p.senLog);
          }
        } else {
          this.rSenList.push(...p.senLog);
        }
      };
    });
  }

  updateDWardList(filterId?) {
    filterId = filterId === 'all' ? undefined : filterId;
    this.match.players.forEach(p => {
      if(!p.isRadiant) {
        if(filterId) {
          if(filterId == p.heroId) {
            this.dWardList.push(...p.obsLog);
          }
        } else {
          this.dWardList.push(...p.obsLog);
        }
      };
    });
  }

  updateDSenList(filterId?) {
    filterId = filterId === 'all' ? undefined : filterId;
    this.match.players.forEach(p => {
      if(!p.isRadiant) {
        if(filterId) {
          if(filterId == p.heroId) {
            this.dSenList.push(...p.senLog);
          }
        } else {
          this.dSenList.push(...p.senLog);
        }
      };
    });
  }

  toggleShow(type, team) {
    if(team === 'r') {
      if(type === 'w') {
        this.showRWard = !this.showRWard;
      } else {
        this.showRSen = !this.showRSen;
      }
    } else {
      if(type === 'w') {
        this.showDWard = !this.showDWard;
      } else {
        this.showDSen = !this.showDSen;
      }
    }
  }

  toggleTimeFilter() {
    this.timeFilter = this.timeFilter === undefined ? 0 : undefined;
  }

  changeTime(e) {
    this.timeFilter = e.detail.value;
  }

  props(num) {
    return (num * this.width / 127) - 192;
  }

  get duration() {
    const hours = Math.floor(this.timeFilter / 3600);
    const minutes = Math.floor((this.timeFilter - (hours * 3600)) / 60);
    return '' + hours + 'h:' + minutes + 'm';
}

  getStyle(item) {
    const res = {'left': this.props(item.x) + 'px', 'bottom': this.props(item.y) + 'px'};
    return res; 
  }

}
