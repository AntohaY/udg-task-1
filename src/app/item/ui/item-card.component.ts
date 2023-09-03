import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from '../../shared/interfaces/item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-item-card',
    template: `
        <ion-card button="true" *ngIf="item">
            <img alt="Nice image" [src]='item.image' (error)="setDefaultPic()" />
            <ion-card-header>
                <ion-card-title>{{ item.itemName }}</ion-card-title>
                <ion-card-subtitle>{{ item.gender }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
                {{ item.material }}
            </ion-card-content>
        </ion-card>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        ion-card {
        --background: #000;
        --color: #9efff0;
        }

        ion-card-title {
        --color: #52ffe4;
        }

        ion-card-subtitle {
        --color: #d1fff8;
        }
    `]
})

export class ItemCardComponent {
    @Input() item!: Item;
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

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