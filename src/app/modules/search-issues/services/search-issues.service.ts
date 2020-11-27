import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { Store } from '@core/store/store';
import { GithubService } from '@core/services/github.service';

import {
  Repository,
  Issue,
  IssuesResponse
} from '@core/interfaces/github.interfaces';

@Injectable()
export class SearchIssuesService {
  constructor(private store: Store, private githubService: GithubService) {}

  getIssues(repoUrl: string, page: number): Observable<any> {
    const { owner, repo } = getOwnerAndRepoFromUrl(repoUrl);

    const url = `/repos/${owner}/${repo}`;

    this.store.set('isLoadingIssues', true);

    return this.githubService.getRepositoryIssues(url, page).pipe(
      finalize(() => this.store.set('isLoadingIssues', false)),
      tap((issuesResponse: IssuesResponse) => {
        this.store.setMultiple({
          issues: issuesResponse.items,
          issuesPaginationLink: issuesResponse.links
        });
      })
    );
  }

  getRepositoryAndIssues(repoUrl: string): Observable<any> {
    const { owner, repo } = getOwnerAndRepoFromUrl(repoUrl);

    const url = `/repos/${owner}/${repo}`;

    this.store.reset();
    this.store.set('isLoadingIssues', true);

    return forkJoin([
      this.githubService.getRepository(url),
      this.githubService.getRepositoryIssues(url)
    ]).pipe(
      finalize(() => this.store.set('isLoadingIssues', false)),
      tap(([repository, issuesResponse]: [Repository, IssuesResponse]) => {
        this.store.setMultiple({
          repository,
          issues: issuesResponse.items,
          issuesPaginationLink: issuesResponse.links,
          issuesError: null
        });
      }),
      catchError((err: HttpErrorResponse) => {
        this.store.setMultiple({
          repository: null,
          issues: null,
          issuesPaginationLink: null,
          issuesError: 'Repositorio no encontrado'
        });

        return of(err);
      })
    );
  }
}

// No necessary this
function getOwnerAndRepoFromUrl(
  repoUrl: string
): { owner: string; repo: string } {
  const path = repoUrl.replace('https://github.com/', '');
  const result = path.split('/');

  return { owner: result[0], repo: result[1] };
}
