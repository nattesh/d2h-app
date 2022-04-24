import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import {OverviewComponent} from './overview/overview.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {WordcloudComponent} from './wordcloud/wordcloud.component';
import {SettingsComponent} from './settings/settings.component';
import {FriendsComponent} from './friends/friends.component';
import {MatchesComponent} from './matches/matches.component';
import {MatchDetailComponent} from './match-detail/match-detail.component';
import {TeamDetailsComponent} from './team-details/team-details.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {CreditsComponent} from './credits/credits.component';
import {SharedModule} from '../shared.module';
import { FormsModule } from '@angular/forms';
import { SearchTabComponent } from './search-tab/search-tab.component';
import { GraphsComponent } from './graphs/graphs.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
    {
        path: '',
        component: PagesPage,
        children: [
            { path: 'friends', component: FriendsComponent },
            { path: 'matches', component: MatchesComponent },
            { path: 'heroes', component: HeroesComponent },
            { path: 'overview', component: OverviewComponent},
            { path: 'wordcloud', component: WordcloudComponent },
            { path: 'credits', component: CreditsComponent },
            { path: 'search', component: SearchTabComponent },
            // { path: 'settings', component: SettingsComponent },
            { path: 'match-detail', component: MatchDetailComponent }
        ]
    }
];

@NgModule({
    declarations: [
        FriendsComponent,
        MatchesComponent,
        HeroesComponent,
        MatchDetailComponent,
        OverviewComponent,
        WordcloudComponent,
        TeamDetailsComponent,
        SettingsComponent,
        HeroDetailComponent,
        ItemDetailComponent,
        SearchTabComponent,
        GraphsComponent,
        MapsComponent
    ],
    imports: [RouterModule.forChild(routes), IonicModule, CommonModule, SharedModule, FormsModule],
    exports: [RouterModule],
    entryComponents: [HeroDetailComponent, ItemDetailComponent, CreditsComponent]
})
export class FolderPageRoutingModule {}
