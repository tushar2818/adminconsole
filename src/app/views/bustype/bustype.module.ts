// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BusTypeComponent } from './bustype.component';
import { BusTypeRoutingModule } from './bustype-routing.module';
import { BusTypeService } from './bustype.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BusTypeRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),

    NgSelectModule,
    DataTablesModule,
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot()
  ],
  declarations: [
    BusTypeComponent,
  ],
  providers: [
    BusTypeService
  ]
})
export class BusTypeModule { }
