import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { ServicesModule } from "./services.module";
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { AppComponent } from "./app.component";
import { ApolloModule } from "apollo-angular";
import { HttpLinkModule } from "apollo-angular-link-http";
import { Routes, RouteComponents } from "./routes";
import { Components } from "./components";
import { Dialogs } from "./dialogs";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LogLevel } from "msal";

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

export const protectedResourceMap: [string, string[]][] = [
  [
    "https://ss1uy.sse.codesandbox.io/graphql",
    ["https://TeamWiz.onmicrosoft.com/app/demo.read"]
  ],
  [
    "https://graph.microsoft.com/v1.0/me",
    ["https://TeamWiz.onmicrosoft.com/app/user.read"]
  ]
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MaterialModule,
    ServicesModule,
    RouterModule.forRoot(Routes),
    MsalModule.forRoot({
      clientID: "7ee72502-ef01-4d2a-a7c3-c6b201beb934",
      authority:
        "https://login.microsoftonline.com/tfp/TeamWiz.onmicrosoft.com/B2C_1_signupsignin1",
      // redirectUri: "https://ooybl.codesandbox.io/home/",
      redirectUri: "http://localhost:4200/home/",
      validateAuthority: true,
      // cacheLocation: "localStorage",
      // postLogoutRedirectUri: "https://ooybl.codesandbox.io/",
      postLogoutRedirectUri: "http://localhost:4200/",
      navigateToLoginRequestUrl: true,
      popUp: false,
      consentScopes: [
        "https://TeamWiz.onmicrosoft.com/app/user.read",
        "https://TeamWiz.onmicrosoft.com/app/demo.read"
      ],
      unprotectedResources: [
        "https://angular.io/"
        // "https://ss1uy.sse.codesandbox.io/"
      ],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: "1234",
      level: LogLevel.Verbose,
      piiLoggingEnabled: true
    })
  ],
  declarations: [
    AppComponent,
    [...RouteComponents],
    [...Components],
    [...Dialogs]
  ],
  entryComponents: [[...Dialogs]],
  bootstrap: [AppComponent],
  providers: [
    // RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
