import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchIssuesPageComponent } from './pages/search-issues-page/search-issues-page.component';

const routes: Routes = [
  {
    path: '',
    component: SearchIssuesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchIssuesRoutingModule {}
