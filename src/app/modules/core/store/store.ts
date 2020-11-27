import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
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
  private stateSubject = new BehaviorSubject<State>(DEFAULT_STATE);
  private store = this.stateSubject.asObservable();

  get value(): State {
    return this.stateSubject.getValue();
  }

  select<T>(key: string): Observable<T> {
    return this.store.pipe(
      map((state: State) => {
        return state[key];
      }),
      distinctUntilChanged()
    );
  }

  reset(): void {
    this.stateSubject.next(DEFAULT_STATE);
  }

  // Set only one key of store
  set(key: string, payload: any): void {
    this.stateSubject.next({
      ...this.value,
      [key]: payload
    });
  }

  // set
  setMultiple(state: Partial<State>): void {
    this.stateSubject.next({
      ...this.value,
      ...state
    });
  }
}
