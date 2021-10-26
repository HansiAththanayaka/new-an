import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HttpClient,
  HttpClientModule,
  HttpClientJsonpModule,
} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { GridModule } from "@progress/kendo-angular-grid";

import { AppComponent } from "./app.component";
import { EditService } from "./edit.service";
import { RemoveConfirmation, StudentComponent } from "./student/student.component";
import { AppRoutingModule } from "./app-routing.module";
import { APP_BASE_HREF } from "@angular/common";
import { GraphQLModule } from "./graphql.module";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { NotifierModule } from "angular-notifier";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
const config: SocketIoConfig = { url: "http://localhost:3001", options: {} };

@NgModule({
  declarations: [AppComponent, StudentComponent,RemoveConfirmation],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GridModule,
    AppRoutingModule,
    GraphQLModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    SocketIoModule.forRoot(config),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: "left",
          distance: 12,
        },
        vertical: {
          position: "bottom",
          distance: 12,
          gap: 10,
        },
      },
      theme: "material",
      behaviour: {
        autoHide: 5000,
        onClick: "hide",
        onMouseover: "pauseAutoHide",
        showDismissButton: true,
        stacking: 4,
      },
      animations: {
        enabled: true,
        show: {
          preset: "slide",
          speed: 300,
          easing: "ease",
        },
        hide: {
          preset: "fade",
          speed: 300,
          easing: "ease",
          offset: 50,
        },
        shift: {
          speed: 300,
          easing: "ease",
        },
        overlap: 150,
      },
    }),
  ],
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
