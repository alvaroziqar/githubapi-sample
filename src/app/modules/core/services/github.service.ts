import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Repository,
  Issue,
  IssuesResponse
} from '@core/interfaces/github.interfaces';

@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}

  getRepository(url: string): Observable<Repository> {
    return this.http.get<Repository>(url);
  }

  getRepositoryIssues(
    urlRepo: string,
    page: number = null
  ): Observable<IssuesResponse> {
    let params = {
      per_page: 10
    } as any;

    if (page) {
      params = {
        ...params,
        page: `${page}`
      };
    }

    return this.http
      .get<Issue[]>(`${urlRepo}/issues`, { observe: 'response', params })
      .pipe(
        map((response: HttpResponse<Issue[]>) => {
          const links = response.headers.get('link');
          return {
            links,
            items: response.body
          };
        })
      );
  }
}
