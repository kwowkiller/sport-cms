import {Component, OnInit} from '@angular/core';
import {Live, LiveTag} from '../live.module';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalForm} from '../../../../common/modal-form';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../../../../common/common.model';

@Component({
  selector: 'app-live-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Live> implements OnInit {
  selectedData: LiveTag[] = [];

  get title() {
    return this.detail ? '编辑直播' : '新增直播';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder
  ) {
    super(http);
    this.submitUrl = 'live/sys/live/add';
    this.form = this.fb.group({
      liveTitle: [null, [Validators.required]],
      liveType: [null, [Validators.required]],
      liveUrl: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }

  fetchSelectData(tag: string) {
    this.http.get<Pageable<LiveTag>>('live/sys/tag/list', {
      params: {tag}
    }).subscribe(event => {
      this.selectedData = event.data.records;
    });
  }
}
