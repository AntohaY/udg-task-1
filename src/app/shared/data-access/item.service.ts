import { Injectable } from '@angular/core';
import { CSVService } from './csv.service';
import { BehaviorSubject, Observable, map, shareReplay, switchMap, take, tap } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({providedIn: 'root'})
export class ItemService {
  private items$ = new BehaviorSubject<Item[]>([]);
  private pagination$ = new BehaviorSubject<any>(10);

  constructor(private csvService: CSVService) { }
  
  load() {
    this.csvService.loadItems$
      .pipe(take(1))
      .subscribe((items) => {
          this.items$.next(items);
      })
  }

  nextPage() {
    this.pagination$.next(this.pagination$.value + 10);
  }

  private sharedItems$: Observable<Item[]> = this.pagination$.pipe(
    switchMap((pagination) => {
      console.log(pagination)
      return this.items$.pipe(
        map((items) => {
          return items.slice(0, pagination)
        })
      )
    }),
    shareReplay(1)
  );

  getItems() {
    return this.sharedItems$;
  }
}