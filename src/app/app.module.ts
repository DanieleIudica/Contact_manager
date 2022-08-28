import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar.component";
import { ContactManagerComponent } from "./components/contact-manager.component";
import { AddContactComponent } from "./components/add-contact.component";
import { EditContactComponent } from "./components/edit-contact.component";
import { ViewContactComponent } from "./components/view-contact.component";
import { SpinnerComponent } from "./components/spinner.component";
import { PnfComponent } from "./components/pnf.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, NavbarComponent, ContactManagerComponent, AddContactComponent, EditContactComponent, ViewContactComponent, SpinnerComponent, PnfComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
