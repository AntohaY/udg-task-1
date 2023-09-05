import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-graph',
    template: ``,
})

export class GraphComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      RouterModule.forChild([
        {
          path: '',
          component: GraphComponent,
        },
      ]),
    ],
    declarations: [GraphComponent],
  })
  export class GraphComponentModule {}