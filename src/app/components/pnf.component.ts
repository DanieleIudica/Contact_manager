import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pnf",
  template: `
    <div class="fs-1 fw-bold m-5 text-center">
      <p>ERROR 404</p>
      <p>PAGE NOT FOUND</p>
    </div>
  `,
  styles: [],
})
export class PnfComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
