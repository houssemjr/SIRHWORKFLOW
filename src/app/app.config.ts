import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from './components/shared/shared.module';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/camunda-identity-realm',
  tokenEndpoint: 'http://localhost:8080/realms/camunda-identity-realm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'camunda-identity-service',
  dummyClientSecret:'n93fJNFySDXV4DDazbumydiAoede6fZN',
  responseType: 'token',
  scope: 'openid profile',
  showDebugInformation: true,
  disablePKCE: true,

};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocument()
      .then(() => resolve());
  });
}



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),provideHttpClient(),provideOAuthClient(),
  MatFormFieldModule,ReactiveFormsModule,MatGridListModule,
MatInputModule, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
MatProgressSpinnerModule,SharedModule,KeycloakAngularModule,BrowserModule,
provideNativeDateAdapter(),NgApexchartsModule,FullCalendarModule,provideAnimations(),BrowserAnimationsModule,FormlyBootstrapModule,MatDialogModule,



{
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
    },
    
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: () => localStorage.getItem('access_token')
      }
    },
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'fr' },

]


};
