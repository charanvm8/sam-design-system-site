import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SamUIKitModule } from 'sam-ui-elements/src/ui-kit';
import { PagesRoutingModule } from './prototypes-pages.routes';
import { PrototypesComponentsModule  } from '../components/prototypes-components.module';

import { PagesComponent } from './prototypes-pages.component';
import { SearchPageComponent } from './search/search.component';
import { HomePageComponent } from './homepage/home.component';
import { SearchMobileComponent } from './search-mobile/search.component';
import { ReportPageComponent } from './report/report.component';
import { CdkTableModule } from '@angular/cdk';
import { MdSortModule, MdPaginatorModule} from '@angular/material';
import { TablePageComponent } from './table/table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    SamUIKitModule,
    MdSortModule,
    MdPaginatorModule,
    CdkTableModule,
    PrototypesComponentsModule
  ],
  declarations: [
    PagesComponent,
    SearchPageComponent,
    HomePageComponent,
    SearchMobileComponent,
    ReportPageComponent,
    TablePageComponent
  ]
})
export class PrototypesPagesModule {}
