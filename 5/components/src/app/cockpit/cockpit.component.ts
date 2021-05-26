import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  // newServerName = '';
  // newServerContent = '';

  // @ViewChild('serverNameInput', { static: true }) serverNameInput: ElementRef;
  // @ViewChild('serverContentInput', { static: true }) serverContentInput:ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: any, contentInput: any) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: contentInput.value
    })
  }

  onAddBlueprint(nameInput: HTMLInputElement, contentInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: contentInput.value
    })
  }
}
