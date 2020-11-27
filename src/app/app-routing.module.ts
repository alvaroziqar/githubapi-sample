import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'search-issues',
    loadChildren: () =>
      import('./modules/search-issues/search-issues.module').then(
        m => m.SearchIssuesModule
      )
  },
  {
    path: '',
    redirectTo: '/search-issues',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
