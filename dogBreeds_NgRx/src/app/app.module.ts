import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './shared/loader.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ImageInterceptor } from './interceptors/image.interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BreedComponent } from './components/breed/breed.component';
import { breedReducer } from './reducers/breed.reducers';
import { BreedEffects } from './effects/breed.effects';

@NgModule({
  declarations: [
    AppComponent,
    BreedComponent,
    HistoryComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ breed: breedReducer }),
    EffectsModule.forRoot([BreedEffects]),
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi:true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ImageInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
