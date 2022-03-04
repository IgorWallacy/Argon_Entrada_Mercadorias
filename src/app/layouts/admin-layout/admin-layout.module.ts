import { PrecosalteraadosComponent } from './../../pages/precosalteraados/precosalteraados.component';
import { ManualItemComponent } from './../../pages/nota/conferencia-manual/item/item.component';
import { ConferenciaManualComponent } from './../../pages/nota/conferencia-manual/conferencia-manual.component';

import { ItemComponent } from './../../pages/nota/conferencia/item/item.component';
import { ConferenciaComponent } from './../../pages/nota/conferencia/conferencia.component';

import { NotaComponent } from './../../pages/nota/nota.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext'
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {ProgressBarModule} from 'primeng/progressbar';
import {CardModule} from 'primeng/card';



import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";

import {MessagesModule} from 'primeng/messages';
import { LoteComponent } from 'src/app/pages/lote/lote.component';
import { MenuDashComponent } from 'src/app/pages/menu-dash/menu-dash.component';

import {TooltipModule} from 'primeng/tooltip';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputNumberModule} from 'primeng/inputnumber';
import {FieldsetModule} from 'primeng/fieldset';

import {InputSwitchModule} from 'primeng/inputswitch';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    SelectButtonModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    CalendarModule,
    ProgressBarModule,
    ZXingScannerModule,
    FieldsetModule,
   MessagesModule,
   BarcodeScannerLivestreamModule,
   CardModule,
   TooltipModule,
   ProgressSpinnerModule,
   InputNumberModule,
   InputSwitchModule
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    NotaComponent,
    ConferenciaComponent,
    ItemComponent,
    LoteComponent,
    MenuDashComponent,
    ConferenciaManualComponent,
    ManualItemComponent,
    PrecosalteraadosComponent
  ],
  providers : [ConfirmationService, MessageService]
})

export class AdminLayoutModule {}
