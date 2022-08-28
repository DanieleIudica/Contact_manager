import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IContact } from "../models/icontact";
import { IGroup } from "../models/igroup";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-add-contact",
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">Add contact</p>
          <p class="fst-italic">
            Al di sotto del form si può notare in diretta come l'oggetto "contact" viene creato. <br />
            In photo url è possibile copiare: "assets/img/user.jpg", "assets/img/woman.jpg", "assets/img/man.jpeg" o il percorso di qualsiasi immagine presa sul web.
          </p>
        </div>
      </div>
    </div>
    <!-- error message -->
    <div *ngIf="!loading && errorMessage">
      <div class="alert alert-danger my-5 mx-auto text-center w-50" role="alert">
        {{ errorMessage }}
      </div>
    </div>
    <!-- create contact form -->
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <form #form="ngForm" (submit)="submit()">
            <div class="mb-2">
              <input required [(ngModel)]="contact.name" name="name" type="text" placeholder="Name" class="form-control" />
            </div>
            <div class="mb-2">
              <input required [(ngModel)]="contact.photo" name="photo" type="text" placeholder="Photo Url" class="form-control" />
            </div>
            <div class="mb-2">
              <input required [(ngModel)]="contact.email" email name="email" type="email" placeholder="Email" class="form-control" />
            </div>
            <div class="mb-2">
              <input required [(ngModel)]="contact.mobile" name="mobile" type="number" placeholder="Mobile" class="form-control" />
            </div>
            <div class="mb-2">
              <input required [(ngModel)]="contact.company" name="company" type="text" placeholder="Company" class="form-control" />
            </div>
            <div class="mb-2">
              <input required [(ngModel)]="contact.title" name="title" type="text" placeholder="Title" class="form-control" />
            </div>
            <div class="mb-2">
              <select required [(ngModel)]="contact.groupId" name="groupId" class="form-select" *ngIf="groups.length > 0">
                <option value="">Select group</option>
                <option [value]="group.id" *ngFor="let group of groups">{{ group.name }}</option>
              </select>
            </div>
            <div class="mb-2">
              <input [disabled]="form.invalid" type="submit" class="btn btn-dark" value="Create" />
              <a routerLink="/" class="btn btn-outline-dark ms-2">Close</a>
            </div>
          </form>
        </div>
        <div class="col-sm-4">
          <img src="assets/img/man.jpeg" class="contact-img" />
        </div>
      </div>
    </div>

    <pre>{{ contact | json }}</pre>
  `,
  styles: [
    `
      input.ng-invalid {
        border-left: 5px solid rgba(255, 0, 0);
      }
      input.ng-valid {
        border-left: 5px solid rgb(0, 243, 0);
      }
    `,
  ],
})
export class AddContactComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string | null = null;
  contact: IContact = {} as IContact;
  groups: IGroup[] = [];

  constructor(private contactSrv: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.contactSrv.getAllGroups().subscribe(
      (data) => {
        this.groups = data;
        // console.log(this.groups);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
    console.log(this.contact);
  }

  submit() {
    this.contactSrv.createContact(this.contact).subscribe(
      (contact) => {
        this.router.navigate(["/"]).then();
      },
      (error) => {
        this.errorMessage = error;
        this.router.navigate(["/contacts/add"]).then();
      }
    );
  }
}
