import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, shareReplay, tap } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({providedIn: 'root'})
export class CSVService {
    constructor(private httpClient: HttpClient) { }
    
    #itemsHaveLoaded = false;
    csv$ = from(this.httpClient.get('assets/Artikel.csv', {responseType: 'text'}))

    loadItems$: Observable<any> = this.csv$.pipe(
        map((items) => {
            let itemsArray: Item[] = [];

            let csvToRowArray = items.split(".jpg");

            csvToRowArray.forEach((row) => {
                let newItem: Item;
                let item = row.split(';');
    
                newItem = {
                    itemId: item[0],
                    itemName: item[1]?.replaceAll('"', '').trim(),
                    manufacturer: item[2]?.replaceAll('"', '').trim(),
                    description: item[3]?.replaceAll('"', '').trim(),
                    materialInformation: item[4]?.replaceAll('"', '').trim(),
                    gender: item[5]?.replaceAll('"', '').trim(),
                    productType: item[6]?.replaceAll('"', '').trim(),
                    sleeve: item[7]?.replaceAll('"', '').trim(),
                    leg: item[8]?.replaceAll('"', '').trim(),
                    collar: item[9]?.replaceAll('"', '').trim(),
                    manufacture: item[10]?.replaceAll('"', '').trim(),
                    bagType: item[11]?.replaceAll('"', '').trim(),
                    gramWeight: item[12]?.replaceAll('"', '').trim(),
                    material: item[13]?.replaceAll('"', '').trim(),
                    countryOfOrigin: item[14]?.replaceAll('"', '').trim(),
                    image: item[15]?.replaceAll('"', '').trim() + '.jpg',
                }
                itemsArray.push(newItem);
            })
            return itemsArray;
        }),
        tap(() => (this.#itemsHaveLoaded = true)),
        shareReplay(1)
    );
}