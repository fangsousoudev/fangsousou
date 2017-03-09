import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
