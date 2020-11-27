import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SearchIssuesRoutingModule } from './search-issues-routing.module';

// Module Services
import { SearchIssuesService } from './services/search-issues.service';

// Pages
import { SearchIssuesPageComponent } from './pages/search-issues-page/search-issues-page.component';

// Components
import { IssueItemComponent } from './components/issue-item/issue-item.component';

@NgModule({
  imports: [SharedModule, SearchIssuesRoutingModule],
  exports: [],
  declarations: [SearchIssuesPageComponent, IssueItemComponent],
  providers: [SearchIssuesService]
})
export class SearchIssuesModule {}
