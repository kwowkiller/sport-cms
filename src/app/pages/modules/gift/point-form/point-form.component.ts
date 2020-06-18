import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styles: []
})
export class PointFormComponent extends ModalForm<any> implements OnInit, OnChanges {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({
      firstBuyGive: [null, [Validators.required]],
      points: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.submitUrl = 'app/sys/points/update';
      this.method = 'PUT';
    }else{
    }
  }

  beforeSubmit() {
  }
}
