import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-level-config',
  templateUrl: './level-config.component.html',
  styles: []
})
export class LevelConfigComponent implements OnInit {
  list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  editable = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  submit(){}
}

