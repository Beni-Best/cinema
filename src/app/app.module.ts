import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WebApiService} from './/services/web-api.service';
import {HttpModule} from '@angular/http';
import {myPipe} from './common/myPipe';

import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    myPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
