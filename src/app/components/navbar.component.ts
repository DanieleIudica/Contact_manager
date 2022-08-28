import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/" routerLinkActive="active">Contact Manager</a>
      </div>
    </nav>
  `,
  styles: [``],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
