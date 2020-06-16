import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Live} from '../../live.module';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-tv-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Live> implements OnInit, OnChanges {

  get title() {
    return this.queryId == null ? '新增直播' : '编辑直播';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder
  ) {
    super(http);
    this.form = this.fb.group({
      startTime: [null, [Validators.required]],
      liveTitle: [null, [Validators.required]],
      liveType: [null, [
        // Validators.required
      ]],
      liveUrl: [null, [Validators.required]],
      liveTag: [null, [Validators.required]],
      liveFaceImage: [null, [Validators.required]],
      // username: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const idChange = changes.queryId;
    if (this.queryId == null) {
      this.method = 'POST';
      this.submitUrl = 'live/sys/live/add';
      this.form.removeControl('id');
      this.form.reset();
    }
    if (
      idChange
      && !idChange.firstChange
      && idChange.currentValue != null
      && idChange.currentValue !== idChange.previousValue
    ) {
      this.submitUrl = 'live/sys/live/update';
      this.method = 'PUT';
      this.loading = true;
      this.http.get<{ code, data: Live }>(`live/sys/live/find/${this.queryId}`).pipe(
        finalize(() => this.loading = false)
      ).subscribe(event => {
        this.form.addControl('id', this.fb.control(null));
        this.form.setValue({
          id: event.data.id,
          startTime: new Date(event.data.startTime),
          liveTitle: event.data.liveTitle,
          liveType: event.data.liveType || null,
          liveUrl: event.data.liveUrl,
          liveTag: event.data.liveTag,
          liveFaceImage: event.data.liveFaceImage,
          // username: '主播名',
        });
      });
    }
  }

  beforeSubmit() {
  }
}
