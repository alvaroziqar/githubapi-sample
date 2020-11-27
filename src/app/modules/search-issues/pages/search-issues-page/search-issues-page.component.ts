import { Store } from '@core/store/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SearchIssuesService } from './../../services/search-issues.service';

import { isGithubUrl } from '@shared/validations/is-github-url.validator';
import { Issue, Repository } from '@core/interfaces/github.interfaces';
import { LastSearchesTriggerDirective } from './../../../last-searches/directives/last-searches-trigger/last-searches-trigger.directive';

@Component({
  selector: 'iron-search-issues-page',
  templateUrl: 'search-issues-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchIssuesPageComponent implements OnInit {
  @ViewChild('searchInput') searchInput: LastSearchesTriggerDirective;

  form: FormGroup;
  repository$: Observable<Repository>;
  issues$: Observable<Issue[]>;
  errorMessage$: Observable<string>;
  isLoading$: Observable<boolean>;
  issuesPaginationLink$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private searchService: SearchIssuesService
  ) {}

  ngOnInit(): void {
    this.subscribeToStoreData();
    this.createForm();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    // populate value to lastSearchedDirective
    // Easy way to get directive instance with exportAs attribute in Directive decorator
    this.searchInput.add(this.form.value.repo);

    // init Data flow
    this.searchService.getRepositoryAndIssues(this.form.value.repo).subscribe();
  }

  onChangePage(page: number): void {
    this.searchService.getIssues(this.form.value.repo, page).subscribe();
  }

  private subscribeToStoreData(): void {
    this.repository$ = this.store.select<Repository>('repository');
    this.issues$ = this.store.select<Issue[]>('issues');
    this.errorMessage$ = this.store.select<string>('issuesError');
    this.isLoading$ = this.store.select<boolean>('isLoadingIssues');
    this.issuesPaginationLink$ = this.store.select<string>(
      'issuesPaginationLink'
    );
  }

  private createForm(): void {
    this.form = this.fb.group({
      repo: ['', [Validators.required, isGithubUrl()]]
    });
  }
}
