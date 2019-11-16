import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingsComponent} from './components/settings/settings.component';
import {HomeViewComponent} from './components/home-view/home-view.component';
import {ProfileComponent} from './components/profile/profile.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/profile'},
  {path: 'profile', component: ProfileComponent},
  {path: 'house/:id/:name/:order', component: HomeViewComponent},
  {path: 'settings', component: SettingsComponent}
  // {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
