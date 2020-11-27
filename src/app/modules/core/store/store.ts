import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { State } from './state';

const DEFAULT_STATE: State = {
  repository: null,
  issues: null,
  issuesPagination: null,
  isLoadingIssues: false,
  issuesError: null,
  issuesPaginationLink: null
};

export class Store {
  private storeSub = new BehaviorSubject<State>(DEFAULT_STATE);
  private store = this.storeSub.asObservable().pipe(distinctUntilChanged());

  get value(): State {
    return this.storeSub.getValue();
  }

  select<T>(key: string): Observable<T> {
    return this.store.pipe(pluck(key));
  }

  reset(): void {
    this.storeSub.next(DEFAULT_STATE);
  }

  // Set only one key of store
  set(key: string, payload: any): void {
    this.storeSub.next({
      ...this.value,
      [key]: payload
    });
  }

  // set
  setMultiple(state: Partial<State>): void {
    this.storeSub.next({
      ...this.value,
      ...state
    });
  }
}
