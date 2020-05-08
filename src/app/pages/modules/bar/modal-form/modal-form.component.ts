import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Bar} from '../bar.module';
import {ModalForm} from '../../../../common/modal-form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-bar-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Bar> implements OnInit {

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({});
  }

  get title() {
    return '创建球吧';
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
