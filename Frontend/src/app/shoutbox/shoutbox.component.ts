import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoutbox',
  templateUrl: './shoutbox.component.html',
  styleUrls: ['./shoutbox.component.css']
})
export class ShoutboxComponent implements OnInit {
  value:string = ""
  shouts:string[] = [];
  constructor() { }

  ngOnInit() {
  }

  addShout(){
    this.shouts.push(this.value);
    this.value = '';
  }

}
