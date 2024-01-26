import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CharactersService } from './character.service';
import { classRpgsService } from './classrpg.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule} from 'ngx-bootstrap/modal';
import { CharacterComponent } from './character/character.component';
import { classRpgComponent } from './classrpg/classrpg.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    classRpgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, CharactersService, classRpgsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
