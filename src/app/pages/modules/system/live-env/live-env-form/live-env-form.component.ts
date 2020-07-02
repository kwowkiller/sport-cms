import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {LiveEnv} from '../../system.module';

@Component({
  selector: 'app-live-env-form',
  templateUrl: './live-env-form.component.html',
  styles: []
})
export class LiveEnvFormComponent extends ModalForm<LiveEnv> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑环境' : '新增环境';
  }

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({
      envName: [null, [Validators.required]],
      generateKeyUrl: [null, [Validators.required]],
      livingUrl: [null, [Validators.required]],
      streamUrl: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail && this.visiable) {
      this.method = 'POST';
      this.submitUrl = 'live/sys/host/setup/update';
      this.form.setValue({
        envName: this.detail.envName,
        generateKeyUrl: this.detail.generateKeyUrl,
        livingUrl: this.detail.livingUrl,
        streamUrl: this.detail.streamUrl,
        type: this.detail.type,
      });
    } else {
      this.method = 'POST';
      this.submitUrl = 'live/sys/host/setup/add';
      this.form.reset();
    }
  }

  beforeSubmit() {
    if (this.detail) {
      this.form.value.id = this.detail.id;
    }
  }

}
