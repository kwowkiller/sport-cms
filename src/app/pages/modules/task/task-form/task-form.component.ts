import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Task} from '../task.module';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styles: []
})
export class TaskFormComponent extends ModalForm<Task> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑任务' : '新增任务';
  }

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({
      complateTimes: [null, [Validators.required]],
      giftId: [null],
      giftNum: [null],
      haveExpireValue: [null, [Validators.required]],
      havePoints: [null, [Validators.required]],
      linkUrl: [null, [Validators.required]],
      remark: [null, [Validators.required]],
      taskIcon: [null, [Validators.required]],
      taskName: [null, [Validators.required]],
      type: [null, [Validators.required]],
      hasGift: [1]
    });
    this.form.controls.hasGift.valueChanges.subscribe(event => {
      // 清除选择的礼物
      if (event === 1) {
        this.form.controls.giftId.setValue(null);
        this.form.controls.giftNum.setValue(null);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail && this.visiable) {
      this.method = 'PUT';
      this.submitUrl = 'app/sys/task/update';
      this.form.setValue({
        complateTimes: this.detail.complateTimes,
        giftId: this.detail.giftId,
        hasGift: this.detail.giftId ? 0 : 1,
        giftNum: this.detail.giftNum,
        haveExpireValue: this.detail.haveExpireValue,
        havePoints: this.detail.havePoints,
        linkUrl: this.detail.linkUrl,
        remark: this.detail.remark,
        taskIcon: this.detail.taskIcon,
        taskName: this.detail.taskName,
        type: this.detail.type,
      });
    } else {
      this.method = 'POST';
      this.submitUrl = 'app/sys/task/add';
      this.form.reset();
    }
  }

  beforeSubmit() {
    if (this.detail) {
      this.form.value.id = this.detail.id;
    }
  }
}
