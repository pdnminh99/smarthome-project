import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { PortalScreenComponent } from './pages/portal-screen/portal-screen.component';
import { DatabaseSnapshot } from '@angular/fire/database';
import { DatabaseService } from 'src/services/Database/database.service';
import { AppComponent } from './app.component';
import { LoginGuard } from 'src/guards/login.guard';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/profile' },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'portal', component: PortalScreenComponent, canActivate: [LoginGuard], children: [
      { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [LoginGuard] },
      { path: 'house/:order', component: HomeViewComponent, canActivate: [LoginGuard] },
    ]
  },

  // { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'house/:id/:name/:order', component: HomeViewComponent },
  // { path: 'settings', component: SettingsComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'portal', component: PortalScreenComponent }
  // {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
