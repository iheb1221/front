import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinner implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
