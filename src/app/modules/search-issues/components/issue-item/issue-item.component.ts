import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Issue } from '@core/interfaces/github.interfaces';

@Component({
  selector: 'iron-issue-item',
  templateUrl: 'issue-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueItemComponent {
  @Input() issue: Issue;

  getDate(): Date {
    return new Date(this.issue.updated_at);
  }
}
