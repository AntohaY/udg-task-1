import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from '../shared/interfaces/item';

@Component({
    selector: 'app-item',
    template: `
        <ng-container>
            kek
        </ng-container>
    `
})

export class ItemComponent implements OnInit {
    @Input() item!: Item;
    constructor() { }

    ngOnInit() { 
        console.log(this.item.itemId)
    }
}

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [ItemComponent],
    exports: [ItemComponent]
})
export class ItemComponentModule {}