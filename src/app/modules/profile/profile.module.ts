import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { OverviewComponent } from './overview/overview.component';
import { AdressComponent } from './adress/adress.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ConnectionsComponent } from './connections/connections.component';
import {
  CardsModule,
  DropdownMenusModule,
  WidgetsModule,
} from '../../_metronic/partials';
import { SharedModule } from "../../_metronic/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    OverviewComponent,
    AdressComponent,
    CampaignsComponent,
    DocumentsComponent,
    ConnectionsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ProfileModule {}
