import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ItemListComponentModule } from './ui/item-list.component';
import { ItemService } from '../shared/data-access/item.service';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Home </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <app-item-list 
            *ngIf="items$ | async as items"
            [items]="items"
            (loadMoreItems)="loadMoreItems()">
        </app-item-list>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    constructor(private itemService: ItemService) {}

    items$ = this.itemService.getItems();

    loadMoreItems() {
        this.itemService.nextPage();
    }
}

@NgModule({
  imports: [
    ItemListComponentModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}