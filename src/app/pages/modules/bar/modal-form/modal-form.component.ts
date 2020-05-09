import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Bar} from '../bar.module';
import {ModalForm} from '../../../../frame/modal-form';
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
    this.form = this.fb.group({
      barLogo: [null, [Validators.required]],
      barName: [null, [Validators.required]],
      barType: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });
    this.submitUrl = 'bar/sys/bar/add';
  }

  get title() {
    return '创建球吧';
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
