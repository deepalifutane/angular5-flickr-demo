import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';

import {FlickrService} from './services/flickr.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ImageContainerComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [FlickrService],
  bootstrap: [AppComponent],
})
export class AppModule { }
