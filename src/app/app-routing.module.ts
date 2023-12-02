import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./features/main/main.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        loadChildren: () => import('./features/main/main.module').then(m => m.MainModule)
      },
      {
        path: '',
        loadChildren: () => import('./features/tea-products/tea-products.module').then(m => m.TeaProductsModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule)
      },
    ]
  },
  {path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
