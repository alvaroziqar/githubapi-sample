import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastSearchesService {
  private lastSearchesSub = new BehaviorSubject<any>(null);
  lastSearches$ = this.lastSearchesSub.asObservable();

  private storageKey = 'ironLastSearches';

  constructor() {
    this.init();
  }

  add(key: string, item: string): void {
    const currentValue = this.lastSearchesSub.getValue();
    const keyValue = (currentValue && currentValue[key]) || [];
    const newKeyValue = [item, ...keyValue].slice(0, 5);
    const value = {
      ...currentValue,
      [key]: [...newKeyValue]
    };

    this.emitValue(value);
  }

  getLastSearches(key: string): Observable<any> {
    return this.lastSearches$.pipe(pluck(key));
  }

  private init(): void {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || null);

    this.lastSearchesSub.next(items);
  }

  private emitValue(value: any): void {
    this.lastSearchesSub.next(value);
    const parseValue = JSON.stringify(value);
    localStorage.setItem(this.storageKey, parseValue);
  }
}
