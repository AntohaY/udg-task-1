import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from '../shared/interfaces/item';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-item',
    template: `
        <ng-container>
        <ion-header>
            <ion-toolbar>
                <ion-title> Kek </ion-title>
            </ion-toolbar>
        </ion-header>
            <ion-content>
                kek
            </ion-content>
        </ng-container>
    `
})

export class ItemComponent implements OnInit {
    itemId!: string;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() { 
        
        this.route.paramMap.subscribe((params) => {
            this.itemId = params.get('id')!;
        })

        console.log(this.itemId)
    }
}

@NgModule({
    imports: [IonicModule, CommonModule,
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