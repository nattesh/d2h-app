import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import {CreditsComponent} from './pages/credits/credits.component';
import {CommonModule} from '@angular/common';
import {ToolbarService} from './services/toolbar.service';
import { HeadToolbarComponent } from './components/head-toolbar/head-toolbar.component';

@NgModule({
    declarations: [CreditsComponent, HeadToolbarComponent],
    entryComponents: [
        CreditsComponent
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot()
    ],
    exports: [
        CreditsComponent, HeadToolbarComponent
    ],
    providers: [
        ToolbarService
    ]
})
export class SharedModule {}
