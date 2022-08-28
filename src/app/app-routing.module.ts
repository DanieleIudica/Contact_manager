import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddContactComponent } from "./components/add-contact.component";
import { ContactManagerComponent } from "./components/contact-manager.component";
import { EditContactComponent } from "./components/edit-contact.component";
import { PnfComponent } from "./components/pnf.component";
import { ViewContactComponent } from "./components/view-contact.component";

const routes: Routes = [
  { path: "", redirectTo: "contacts/admin", pathMatch: "full" },
  { path: "contacts/admin", component: ContactManagerComponent },
  { path: "contacts/add", component: AddContactComponent },
  { path: "contacts/edit/:contactId", component: EditContactComponent },
  { path: "contacts/view/:contactId", component: ViewContactComponent },
  { path: "**", component: PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
