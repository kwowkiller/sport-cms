import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-live-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<any> implements OnInit, OnChanges {
  get title() {
    return this.queryId == null ? '新增直播' : '编辑直播';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder
  ) {
    super(http);
    this.submitUrl = 'live/sys/host/log/add';
    this.form = this.fb.group({
      fromTime: [null, [Validators.required]],
      hostTag: [null, [Validators.required]],
      hostType: [null, [Validators.required]],
      liveImg: [null, [Validators.required]],
      liveTitle: [null, [Validators.required]],
      liveUrl: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.queryId) {
      this.submitUrl = '';
      this.http.get<{}>(`live/sys/host/log/detail?id=${this.queryId}`).subscribe(event => {
      });
    } else {
      this.submitUrl = 'live/sys/host/log/add';
      this.method = 'POST';
      this.form.reset();
    }
  }

  beforeSubmit() {
  }
}
