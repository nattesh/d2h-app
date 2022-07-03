import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {paths} from './constants/routes.constant';
import { FetchConstantsComponent } from './fetch-constants/fetch-constants.component';

const routes: Routes = [
  {
    path: paths.search,
    component: SearchComponent
  },
  {
    path: paths.pages,
    loadChildren: './pages/pages.module#FolderPageModule'
  },
  {
    path: paths.fetch,
    component: FetchConstantsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
