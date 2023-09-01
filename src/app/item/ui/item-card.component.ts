import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from '../../shared/interfaces/item';

@Component({
    selector: 'app-item-card',
    template: `
        <ion-card *ngIf="item" (click)="goToItemPage(item)">
            <img alt="Nice image" [src]='item.image' (error)="setDefaultPic()" />
            <ion-card-header>
                <ion-card-title>{{ item.itemName }}</ion-card-title>
                <ion-card-subtitle>{{ item.manufacture }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
                {{ item.description }}
            </ion-card-content>
        </ion-card>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ItemCardComponent {
    @Input() item!: Item;
    constructor() { }

    goToItemPage(item: Item) {
        console.log(item);
    }

    setDefaultPic() {
        this.item.image = "https://ionicframework.com/docs/img/demos/card-media.png";
    }
}

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [ItemCardComponent],
    exports: [ItemCardComponent]
})
export class ItemCardComponentModule {}