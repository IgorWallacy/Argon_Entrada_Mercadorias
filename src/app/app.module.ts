import { ErrorHandlerService } from './error-handler.service';
import { ConferenciaManualService } from './conferencia-manual.service';

import { LoteService } from './services/lote.service';
import { TokenInterceptor } from './tokenInterceptor';
import { NotaService } from './services/nota.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { DatePipe, DecimalPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';




import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    
  
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
    
    
    
    
    
    
    
  ],
  providers: [NotaService, ConferenciaManualService, LoteService, DatePipe,CurrencyPipe,DecimalPipe, ErrorHandlerService, {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true
  }
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
