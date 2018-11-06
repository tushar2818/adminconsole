import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusStandComponent } from './busstand.component'; 
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bus Stand'
    },
    children: [
      {
        path: 'busstand',
        component: BusStandComponent,
        data: {
          title: 'Bus Stand'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusStandRoutingModule {}
