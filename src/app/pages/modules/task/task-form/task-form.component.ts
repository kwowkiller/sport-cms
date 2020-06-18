import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styles: []
})
export class TaskFormComponent extends ModalForm<any> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑任务' : '新增任务';
  }

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  beforeSubmit() {
  }
}
