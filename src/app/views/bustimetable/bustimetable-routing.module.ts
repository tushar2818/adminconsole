import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusTimeTableComponent } from './bustimetable.component'; 
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bus Time Table'
    },
    children: [
      {
        path: 'bustimetable',
        component: BusTimeTableComponent,
        data: {
          title: 'Bus Time Table'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusTimeTableRoutingModule {}
