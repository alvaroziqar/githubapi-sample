import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { LastSearchesService } from '../../services/last-searches.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-last-searches',
  templateUrl: './last-searches.component.html',
  styleUrls: ['./last-searches.component.scss']
})
export class LastSearchesComponent implements OnInit {
  @Input() key: string;

  @Output() clickItem = new EventEmitter<string>();

  lastSearches$: Observable<any>;

  constructor(private lastSearchesService: LastSearchesService) {}

  ngOnInit(): void {
    this.lastSearches$ = this.lastSearchesService.getLastSearches(this.key);
  }

  onClickItem(item: string): void {
    this.clickItem.emit(item);
  }
}
