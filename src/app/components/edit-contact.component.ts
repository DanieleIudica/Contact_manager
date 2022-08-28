import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IContact } from "../models/icontact";
import { IGroup } from "../models/igroup";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-edit-contact",
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">Edit contact</p>
          <p class="fst-italic">
            Al di sotto del form si può notare in diretta come il value dell'oggetto "formValue" viene modificato.<br />
            Come photo url è possibile copiare: "assets/img/user.jpg", "assets/img/woman.jpg", "assets/img/man.jpeg" o il percorso di qualsiasi immagine presa dal web.
          </p>
        </div>
      </div>
    </div>
    <!-- Edit contact form -->
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <form #form="ngForm" (submit)="submitUpdate()">
            <div class="mb-2">
              <input required [ngModel]="contact.name" [value]="contact.name" name="name" type="text" placeholder="Name" class="form-control" />
            </div>
            <div class="mb-2">
              <input [ngModel]="contact.photo" [value]="contact.photo" name="photo" type="text" placeholder="Photo Url" class="form-control" />
            </div>
            <div class="mb-2">
              <input [ngModel]="contact.email" [value]="contact.email" name="email" type="email" placeholder="Email" class="form-control" />
            </div>
            <div class="mb-2">
              <input [ngModel]="contact.mobile" [value]="contact.mobile" name="mobile" type="number" placeholder="Mobile" class="form-control" />
            </div>
            <div class="mb-2">
              <input [ngModel]="contact.company" [value]="contact.company" name="company" type="text" placeholder="Company" class="form-control" />
            </div>
            <div class="mb-2">
              <input [ngModel]="contact.title" [value]="contact.title" name="title" type="text" placeholder="Title" class="form-control" />
            </div>
            <div class="mb-2">
              <select [(ngModel)]="contact.groupId" name="groupId" class="form-select">
                <option value="">Select group</option>
                <option [value]="contact.groupId" *ngFor="let group of groups">{{ group.name }}</option>
              </select>
            </div>
            <div class="mb-2">
              <input type="submit" class="btn btn-dark" value="Update" />
              <a routerLink="/" class="btn btn-outline-dark ms-2">Close</a>
            </div>
          </form>
        </div>
        <div class="col-sm-4">
          <img [src]="contact.photo" class="contact-img" />
        </div>
      </div>
    </div>
    <pre>{{ formValue.value | json }}</pre>
  `,
  styles: [],
})
export class EditContactComponent implements OnInit {
  loading: boolean = false;
  contactId: string | null = null;
  errorMessage: string | null = null;
  contact: IContact = {} as IContact;
  groups: IGroup[] = [] as IGroup[];
  @ViewChild("form", { static: true }) formValue!: NgForm;

  constructor(private aRoute: ActivatedRoute, private contactSrv: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.aRoute.params.subscribe((param) => {
      this.contactId = param["contactId"];
    });
    if (this.contactId) {
      this.contactSrv.getContact(this.contactId).subscribe(
        (data) => {
          this.contact = data;
          this.loading = false;
          this.contactSrv.getAllGroups().subscribe((data) => {
            this.groups = data;
          });
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }

  submitUpdate() {
    if (this.contactId) {
      this.contactSrv.updateContact(this.formValue.value, this.contactId).subscribe(
        (data) => {
          // console.log(this.contact);
          // console.log(this.formValue.value);
          this.router.navigate(["/"]).then();
        },
        (error) => {
          this.errorMessage = error;
          this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        }
      );
    }
  }
}
