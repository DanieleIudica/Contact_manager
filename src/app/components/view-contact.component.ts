import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IContact } from "../models/icontact";
import { IGroup } from "../models/igroup";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-view-contact",
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">View contact</p>
          <p class="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim placeat ipsum ipsam ipsa veritatis ut explicabo non commodi, repellendus quis nihil dignissimos. Impedit nisi at exercitationem corporis ut rem reprehenderit?</p>
        </div>
      </div>
    </div>
    <!-- spinner -->
    <div *ngIf="loading">
      <app-spinner></app-spinner>
    </div>
    <!-- error message -->
    <div *ngIf="!loading && errorMessage">
      <div class="alert alert-danger my-5 mx-auto text-center w-50" role="alert">
        {{ errorMessage }}
      </div>
    </div>
    <!-- contact details -->
    <div class="container" *ngIf="!loading && contact && group">
      <div class="row align-items-center">
        <div class="col-sm-4">
          <img [src]="contact.photo" class="contact-img-big" />
        </div>
        <div class="col-sm-4">
          <ul class="list-group">
            <li class="list-group-item list-group-item-dark">
              Name: <span class="fw-bold">{{ contact.name }}</span>
            </li>
            <li class="list-group-item list-group-item-dark">
              Email: <span class="fw-bold">{{ contact.email }}</span>
            </li>
            <li class="list-group-item list-group-item-dark">
              Mobile: <span class="fw-bold">{{ contact.mobile }}</span>
            </li>
            <li class="list-group-item list-group-item-dark">
              Compay: <span class="fw-bold">{{ contact.company }}</span>
            </li>
            <li class="list-group-item list-group-item-dark">
              Title: <span class="fw-bold">{{ contact.title }}</span>
            </li>
            <li class="list-group-item list-group-item-dark">
              Group: <span class="fw-bold">{{ group.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <a routerLink="/" class="btn btn-outline-dark mt-3 btn-sm"><i class="fa-solid fa-circle-chevron-left"></i> &nbsp; Back</a>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ViewContactComponent implements OnInit {
  contactId: string | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;
  contact!: IContact;
  group!: IGroup;

  constructor(private aRoute: ActivatedRoute, private contactSrv: ContactService) {}

  ngOnInit(): void {
    this.loading = true;
    this.aRoute.params.subscribe((param) => {
      this.contactId = param["contactId"];
      // console.log(this.contactId);
      this.loadContact(this.contactId!);
      // this.loadGroup(this.group);
    });
  }

  loadContact(id: string) {
    this.contactSrv.getContact(id).subscribe(
      (data) => {
        this.contact = data;
        this.loading = false;
        // console.log(this.contact);
        this.contactSrv.getGroup(data).subscribe((data: IGroup) => {
          this.group = data;
          // console.log(this.group);
        });
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
