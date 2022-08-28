import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-spinner",
  template: `
    <div class="d-flex justify-content-center mt-5">
      <div class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [],
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
