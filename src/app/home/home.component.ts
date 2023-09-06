import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';
import { ItemListComponentModule } from './ui/item-list.component';
import { ItemService } from '../shared/data-access/item.service';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { FormModalComponentModule } from '../shared/ui/form-modal.component';
import { CSVService } from '../shared/data-access/csv.service';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Home </ion-title>
        <ion-buttons slot="end">
            <ion-button fill="solid" color="warning" routerLink="/graph">Graph</ion-button>
            <ion-button fill="solid" color="danger" (click)="downloadCSV()">Download CSV file</ion-button>
            <ion-button fill="solid" color="success" (click)="openCreateModal()">Add item</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <app-item-list 
            *ngIf="items$ | async as items"
            [items]="items"
            (loadMoreItems)="loadMoreItems()">
        </app-item-list>
        <ion-modal
            [isOpen]="formModalIsOpen$"
            [presentingElement]="routerOutlet.nativeEl"
            [canDismiss]="true"
            (ionModalDidDismiss)="formModalIsOpen$.next(false)"
            >
            <ng-template>
                <app-form-modal
                [title]="'Add item'"
                [formGroup]="itemForm"
                (save)="addItem()"
                ></app-form-modal>
            </ng-template>
          </ion-modal>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

    constructor(private fb: FormBuilder, private itemService: ItemService, public routerOutlet: IonRouterOutlet) {}

    items$ = this.itemService.getItems();

    formModalIsOpen$ = new BehaviorSubject<boolean>(false);

    itemForm = this.fb.nonNullable.group({
      itemName: ['', Validators.required],
      manufacturer: [''],
      description: [''],
      materialInformation: [''],
      gender: [''],
      productType: [''],
      sleeve: [''],
      leg: [''],
      collar: [''],
      manufacture: [''],
      bagType: [''],
      gramWeight: [''],
      material: [''],
      countryOfOrigin: [''],
      image: [''],
  });

    loadMoreItems() {
      this.itemService.nextPage();
    }

    addItem() {
      this.itemService.addItem(
        {itemId: Date.now().toString(), ...this.itemForm.getRawValue()}
      );
    }

    openCreateModal() {
      this.formModalIsOpen$.next(true);
    }

    downloadCSV() {
      this.itemService.saveCSV();
    }
}

@NgModule({
  imports: [
    FormModalComponentModule,
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