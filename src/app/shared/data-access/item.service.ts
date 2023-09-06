import { Injectable } from '@angular/core';
import { CSVService } from './csv.service';
import { BehaviorSubject, Observable, filter, map, shareReplay, switchMap, take } from 'rxjs';
import { Item } from '../interfaces/item';
import { GraphDataObject } from '../interfaces/graphDataObject';

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
    this.pagination$.next(this.pagination$.value + 5);
  }

  private sharedItems$: Observable<Item[]> = this.items$.pipe(
    shareReplay(1)
  );

  getItemById(id: string) {
    return this.getItems().pipe(
      filter((items) => items.length > 0),
      map((items) => items.find((item) => item.itemId === id))
    )
  }

  getGenderPercentageForGraph(): Observable<[GraphDataObject, GraphDataObject]> {
    return this.items$.pipe(
      map((items) => {
        let herrenAmount = 0;
        let damenAmount = 0;
        items.forEach(item => {
          if (item.gender === 'Herren') {
            herrenAmount++;
          } else {
            damenAmount++;
          }
        });

        const genderPercentageData: [GraphDataObject, GraphDataObject] = [
          {
            title: 'Herren',
            value: herrenAmount 
            // * 100 / items.length
          },
          {
            title: 'Damen',
            value: damenAmount 
            // * 100 / items.length
          }
        ];

        return genderPercentageData;
      })
    )
  }

  getItems() {
    return this.sharedItems$.pipe(
      switchMap((items) => {
        return this.pagination$.pipe(
          map(pagination => {
            return items.slice(0, pagination)
          })
      )})
    );
  }

  addItem(item: Item) {
    const newItem = {
      ...item,
      itemId: Date.now().toString(),
    };
    this.items$.next([...this.items$.value, newItem]);
  }

  editItem(id: string, editedData: Item) {
    const modifiedItems = this.items$.value.map((item) =>
      item.itemId === id
        ? { ...item, itemName: editedData.itemName }
        : item
    );
    this.items$.next(modifiedItems);
  }

  deleteItem(id: string) {
    const modifiedItems = this.items$.value.filter(
      (item) => item.itemId !== id
    );
    this.items$.next(modifiedItems);
  }

  saveCSV() {
    this.csvService.saveItems(this.items$.value);
  }
}