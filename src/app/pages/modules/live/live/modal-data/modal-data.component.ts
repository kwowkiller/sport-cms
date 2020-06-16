import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-live-data',
  templateUrl: './modal-data.component.html',
  styles: []
})
export class ModalDataComponent extends ModalForm<any> implements OnInit, OnChanges {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const idChange = changes.queryId;
    if (idChange && !idChange.firstChange && this.visiable) {
      this.detailUrl = `/${this.queryId}`;
      // this.fetchDetail();
    }
  }

  beforeSubmit() {
  }
}
