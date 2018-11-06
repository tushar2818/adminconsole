import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusTypeComponent } from './bustype.component'; 
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bus Type'
    },
    children: [
      {
        path: 'bustype',
        component: BusTypeComponent,
        data: {
          title: 'Bus Type'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusTypeRoutingModule {}
