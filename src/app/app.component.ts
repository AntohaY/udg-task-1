import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ItemService } from './shared/data-access/item.service';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemService.load();
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'home',
          loadChildren: () =>
            import('./home/home.component').then((m) => m.HomeComponentModule),
        },
        {
          path: 'item/:id',
          loadChildren: () => 
            import('./item/item.component').then((m) => m.ItemComponentModule),
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full',
        },       
      ],
      { preloadingStrategy: PreloadAllModules }
    ),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}