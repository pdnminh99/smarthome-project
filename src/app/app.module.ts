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
import { ConnectDialogComponent } from './components/connect-dialog/connect-dialog.component';
import { DetailInfoComponent } from './components/detail-info/detail-info.component';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { ChartsModule } from 'ng2-charts';
import { DialogMonitorButtonComponent } from './components/dialog-monitor-button/dialog-monitor-button.component';
import { LoginComponent } from './components/login/login.component';
import { MainviewComponent } from './components/mainview/mainview.component';
import { HomeTabComponent } from './components/home-tab/home-tab.component';
import { ModuleViewComponent } from './components/module-view/module-view.component';
import { InfoButtonComponent } from './components/info-button/info-button.component';
import { InfoDisplayComponent } from './components/info-display/info-display.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    ConnectDialogComponent,
    DetailInfoComponent,
    DialogMonitorButtonComponent,
    LoginComponent,
    MainviewComponent,
    HomeTabComponent,
    ModuleViewComponent,
    InfoButtonComponent,
    InfoDisplayComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
