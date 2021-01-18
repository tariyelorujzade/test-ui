import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './pages/form/form.component';
import { SuccessComponent } from './pages/success/success.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PagesComponent } from './pages/pages.component';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CustomDateAdapterModule } from './custom-date-adapter.module';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhoneMaskDirective } from './pages/directives/phone-mask.directive';
import { InfoMessageComponent } from './pages/shared/info-message/info-message.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppInterceptor } from './app.interceptor';
import { MaskDateDirective } from './pages/directives/mask-date.directive';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SuccessComponent,
    PagesComponent,
    PhoneMaskDirective,
    MaskDateDirective,
    InfoMessageComponent
  ], 
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDateAdapterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule
  ],  
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
