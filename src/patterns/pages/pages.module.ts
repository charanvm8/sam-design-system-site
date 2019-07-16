import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SamUIKitModule } from '@gsa-sam/sam-ui-elements';
import { PagesRoutingModule } from './pages.routes';

import { PagesComponent } from './pages.component';
import { LayoutModule } from './layout';
import { SamWorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { SamEntityResultsComponent } from './entity-results/entity-results.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    SamUIKitModule,
    LayoutModule
  ],
  declarations: [
    PagesComponent,
    SamWorkspaceDashboardComponent,
    SamEntityResultsComponent
  ]
})
export class PagesModule { }
