import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pa',
  templateUrl: './pa.component.html',
  styleUrls: ['./pa.component.css']
})
export class PAComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onChange(value: any, att: string){
    this.valueChange.emit({att: att, value: value.value})
  }
}
