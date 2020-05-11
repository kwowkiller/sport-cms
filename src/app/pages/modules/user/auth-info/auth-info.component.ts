import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthInfo} from '../user.module';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-auth-info',
  templateUrl: './auth-info.component.html',
  styles: []
})
export class AuthInfoComponent extends ModalForm<AuthInfo> implements OnInit, OnChanges {
  constructor(protected http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const idChange = changes.queryId;
    if (idChange && !idChange.firstChange) {
      this.detailUrl = `app/sys/app/user/auth/${this.queryId}`;
      this.fetchDetailOnly();
    }
  }

  beforeSubmit() {
  }
}
