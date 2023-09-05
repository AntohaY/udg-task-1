import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { ItemCardComponentModule } from 'src/app/item//ui/item-card.component';
import { Item } from 'src/app/shared/interfaces/item';

@Component({
    selector: 'app-item-list',
    template: `
        <ion-list>
            <ion-grid>
                <ion-row>
                    <ion-col *ngFor="let item of items; trackBy: trackByFn" size-sm="2" size-xs="4" size-lg="1">
                        <app-item-card routerLink="/item/{{ item.itemId }}" [item]="item"></app-item-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-list>
        <ion-infinite-scroll (ionInfinite)="onIonInfinite($event)">
            <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        ion-grid {
            --ion-grid-columns: 4;
        }
    `]
})

export class ItemListComponent {
    @Input() items!: Item[];
    @Output() loadMoreItems = new EventEmitter();
    constructor() {}

    trackByFn(index: number, item: Item) {
        return item.itemId;
    }

    onIonInfinite(ev: Event) {
        this.loadMoreItems.emit();
        setTimeout(() => {
            (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
    }
}

@NgModule({
    imports: [CommonModule, IonicModule, ItemCardComponentModule, RouterModule],
    declarations: [ItemListComponent],
    exports: [ItemListComponent]
})
export class ItemListComponentModule {}