import { Component, OnInit } from "@angular/core";
import { IContact } from "../models/icontact";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-contact-manager",
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="fst-italic">Contact Manager App che mette a disposizione le funzionalità CRUD, Creata utilizzando Angular, json-server e Bootstrap.</p>
          <p class="fst-italic">Aprire un terminale nella cartella server e inserire il comando "npm start" per avviare il json-server.</p>
          <p class="h3">
            <a class="btn btn-outline-dark" routerLink="/contacts/add">Create New User &nbsp; <i class="fa-solid fa-circle-plus"></i></a>
          </p>
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
    <!-- cards -->
    <div class="container mt-3" *ngIf="!loading && contacts.length > 0">
      <div class="row">
        <div class="col-md-6 mb-4" *ngFor="let contact of contacts">
          <div class="card list-group-item-dark">
            <div class="card-body  shadow">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <img [src]="contact.photo" class="contact-img" />
                </div>
                <div class="col-sm-7">
                  <ul class="list-group">
                    <li class="list-group-item">
                      Name: <span class="fw-bold">{{ contact.name }}</span>
                    </li>
                    <li class="list-group-item">
                      Email: <span class="fw-bold">{{ contact.email }}</span>
                    </li>
                    <li class="list-group-item">
                      Mobile: <span class="fw-bold">{{ contact.mobile }}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                  <a routerLink="/contacts/view/{{ contact.id }}" class="btn btn-dark my-1"><i class="fa-solid fa-eye"></i></a>
                  <a routerLink="/contacts/edit/{{ contact.id }}" class="btn btn-dark my-1"><i class="fa-solid fa-pen-to-square"></i></a>
                  <button class="btn btn-dark my-1" (click)="delContact(contact.id)"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>{{ contacts | json }}</pre> -->
  `,
  styles: [],
})
export class ContactManagerComponent implements OnInit {
  loading: boolean = false;
  contacts: IContact[] = [];
  errorMessage: string | null = null;

  constructor(private contactSrv: ContactService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.contactSrv.getAllContacts().subscribe(
      (data: IContact[]) => {
        this.contacts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  delContact(contactId: string | undefined) {
    if (confirm(`Sei sicuro di voler elimiare l'utente selezionato?`)) {
      if (contactId) {
        this.contactSrv.deleteContact(contactId).subscribe(
          (data) => {
            this.getAll();
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      }
    }
  }
}
