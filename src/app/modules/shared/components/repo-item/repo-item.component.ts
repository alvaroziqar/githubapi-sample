import { Component, Input } from '@angular/core';
import { Repository } from '@core/interfaces/github.interfaces';

@Component({
  selector: 'iron-repo-item',
  templateUrl: 'repo-item.component.html'
})
export class RepoItemComponent {
  @Input() repo: Repository;
}
