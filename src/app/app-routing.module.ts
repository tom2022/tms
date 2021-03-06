import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'current-tour', loadChildren: './current-tour/current-tour.module#CurrentTourPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'upcoming-tours', loadChildren: './upcoming-tours/upcoming-tours.module#UpcomingToursPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
