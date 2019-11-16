import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ChartsComponent } from './components/charts/charts.component';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { ChartsModule } from 'ng2-charts';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModuleViewComponent } from './components/module-view/module-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { CreateGroupButtonComponent } from './components/create-group-button/create-group-button.component';
import { SidenavSubmenuComponent } from './components/sidenav-submenu/sidenav-submenu.component';
import { SidenavHeaderComponent } from './components/sidenav-header/sidenav-header.component';
import { PortalScreenComponent } from './pages/portal-screen/portal-screen.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsService } from '../services/Settings/settings.service';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';

registerLocaleData(en);

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, ChartsComponent, ModuleViewComponent, HomeViewComponent, CreateGroupButtonComponent, SidenavSubmenuComponent, SidenavHeaderComponent, PortalScreenComponent, LoginComponent, SettingsComponent, ProfileComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ChartsModule,
    BrowserModule,
    NzModalModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [SettingsService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
