import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {AuthInfo} from '../../user/user.module';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-bar-user',
  templateUrl: './modal-user.component.html',
  styles: []
})
export class ModalUserComponent extends ModalForm<AuthInfo> implements OnInit, OnChanges {

  constructor(protected http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const idChange = changes.queryId;
    if (idChange && !idChange.firstChange) {
      this.detailUrl = `bar/sys/bar/user/${this.queryId}`;
      this.fetchDetail();
    }
  }

  beforeSubmit() {
  }
}
