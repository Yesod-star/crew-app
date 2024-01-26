import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { classRpgComponent } from './classrpg/classrpg.component';

const routes: Routes = [
  {path: 'character', component: CharacterComponent},
  {path: 'classes', component: classRpgComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
