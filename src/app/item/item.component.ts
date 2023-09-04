import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemService } from '../shared/data-access/item.service';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { FormModalComponentModule } from '../shared/ui/form-modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Item } from '../shared/interfaces/item';

@Component({
    selector: 'app-item',
    template: `  
        <ng-container *ngIf="vm$ | async as vm">
            <ion-header>
                <ion-toolbar>
                    <ion-title> {{ vm.item?.itemName }} </ion-title>
                    <ion-buttons slot="end">
                        <ion-button fill="solid" color="danger" (click)="deleteItem(vm.item?.itemId!)">Delete item</ion-button>
                    </ion-buttons>
                    <ion-buttons slot="end">
                        <ion-button fill="solid" color="warning" (click)="openEditModal(vm.item!)">Edit item</ion-button>
                    </ion-buttons>
                </ion-toolbar>

            </ion-header>
            <ion-content class="ion-padding">
                <div class="item-container">
                    <img src="https://ionicframework.com/docs/img/demos/card-media.png" alt="Item image">
                
                    <div class="more-information">
                        <ion-item *ngIf="vm.item?.description" lines="none" color="tertiary">
                            <ion-label>Description: </ion-label>
                            <ion-label class="ion-text-wrap">{{ vm.item?.description }}</ion-label>
                        </ion-item>

                        <ion-item *ngIf="vm.item?.manufacturer" lines="none" color="tertiary">
                            <ion-label>Manufacturer: </ion-label>
                            <ion-label>{{ vm.item?.manufacturer }}</ion-label>
                        </ion-item>

                        <ion-item *ngIf="vm.item?.countryOfOrigin" lines="none" color="tertiary">
                            <ion-label>Country of origin: </ion-label>
                            <ion-label>{{ vm.item?.countryOfOrigin }}</ion-label>
                        </ion-item>

                        <ion-item *ngIf="vm.item?.gender" lines="none" color="tertiary">
                            <ion-label>Gender: </ion-label>
                            <ion-label> {{ vm.item?.gender }}</ion-label>
                        </ion-item>
                    </div>
                </div>
                <ion-modal
                    [isOpen]="vm.formModalIsOpen"
                    [presentingElement]="routerOutlet.nativeEl"
                    [canDismiss]="true"
                    (ionModalDidDismiss)="
                        itemIdBeingEdited$.next(null); formModalIsOpen$.next(false)
                    "
                    >
                    <ng-template>
                        <app-form-modal
                        [title]="
                            itemIdBeingEdited$ ? 'Edit item' : 'Create item'
                        "
                        [formGroup]="itemForm"
                        (save)="editItem(vm.itemIdBeingEdited!)"
                        ></app-form-modal>
                    </ng-template>
                </ion-modal>
            </ion-content>
        </ng-container>
    `,
    styles: [`
        .item-container {

            @media(min-width:801px) {
                display: flex;
                flex-direction: column;

                img {
                    align-self: center;
                }
            }
            
        }
    `]
})

export class ItemComponent {
    item$ = this.route.paramMap.pipe(
        switchMap((params) => {
            return this.itemService.getItemById(params.get('id') as string)
        })
    );

    itemIdBeingEdited$ = new BehaviorSubject<string | null>(null);

    formModalIsOpen$ = new BehaviorSubject<boolean>(false);

    vm$ = combineLatest([
        this.item$,
        this.formModalIsOpen$,
        this.itemIdBeingEdited$,
      ]).pipe(
        map(
          ([ item, formModalIsOpen, itemIdBeingEdited]) => ({
            item,
            formModalIsOpen,
            itemIdBeingEdited,
          })
        )
      );

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

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private itemService: ItemService, public routerOutlet: IonRouterOutlet) { }
    
    editItem(checklistItemId: string) {
        // this.itemService.update(
        //   checklistItemId,
        //   this.itemForm.getRawValue()
        // );
    }

    openEditModal(item: Item) {
        this.itemForm.patchValue({
          itemName: item.itemName,
        });
        this.itemIdBeingEdited$.next(item.itemId);
        this.formModalIsOpen$.next(true);
    }

    deleteItem(id: string) {
        // this.itemService.remove(id);
    }

}

@NgModule({
    imports: [IonicModule, CommonModule,
        FormModalComponentModule,
        RouterModule.forChild([
            {
                path: '',
                component: ItemComponent,
            },
        ]),
    ],
    declarations: [ItemComponent],
    exports: [ItemComponent],
})
export class ItemComponentModule {}