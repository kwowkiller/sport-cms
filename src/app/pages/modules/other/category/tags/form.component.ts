import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Category, Tags} from '../../other.module';

@Component({
  selector: 'app-tags-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Tags> implements OnInit, OnChanges {
  @Input()
  category: Category;

  get title() {
    return this.detail ? '编辑标签' : '创建标签';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      liveType: [null, [Validators.required]],
      tag: [null, [Validators.required]],
      sstatus: [0, [Validators.required]],
      orderNum: [null, [Validators.required]],
      // moduleType: [0, [Validators.required]],
    });
    this.submitUrl = 'live/sys/tag/add';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.form.addControl('id', this.fb.control(this.detail.id));
      this.form.setValue({
        id: this.detail.id,
        tag: this.detail.tag,
        sstatus: this.detail.sstatus,
        orderNum: this.detail.orderNum,
        liveType: this.detail.liveType,
        // moduleType: this.detail.moduleType,
      });
      this.method = 'POST';
      this.submitUrl = 'live/sys/tag/update';
    } else {
      this.form.removeControl('id');
      this.form.reset({
        liveType: this.category.id,
      }, {onlySelf: true});
      this.method = 'POST';
      this.submitUrl = 'live/sys/tag/add';
    }
  }

  beforeSubmit() {
  }
}
