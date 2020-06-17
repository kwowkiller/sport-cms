import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-scheme-history',
  templateUrl: './scheme-history.component.html',
  styles: []
})
export class SchemeHistoryComponent extends ModalForm<any> implements OnInit {

  constructor(http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
