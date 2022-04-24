import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './pages-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {PagesPage} from './pages.page';
import {ToolbarService} from '../services/toolbar.service';
import {ModalService} from '../services/modal.service';
import { OthersPopoverComponent } from '../components/others-popover/others-popover.component';
import { pageTransition } from './page-transition';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({
      swipeBackEnabled: true,
      navAnimation: pageTransition
    }),
    IonicStorageModule.forRoot(),
    FolderPageRoutingModule
  ],
  declarations: [
      PagesPage,
      OthersPopoverComponent
  ],
  providers: [
      ToolbarService,
      ModalService
  ],
  entryComponents: [
    OthersPopoverComponent
  ]
})
export class FolderPageModule {}
