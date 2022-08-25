import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';

//isso se chama easy load, aglo assim

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
