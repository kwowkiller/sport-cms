import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-anchor-auth-info',
  templateUrl: './auth-info.component.html',
  styles: []
})
export class AuthInfoComponent extends ModalForm<{
  appUserAuthenStatus: number
  authStatus: number;
  creationTime: string;
  frontPhoto: string;
  handPhoto: string;
  headerImg: null
  idNo: string;
  isAuthenHost: number;
  nikeName: string;
  phone: string;
  realName: string;
  versoPhoto: string;
}> implements OnInit, OnChanges {

  constructor(protected http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const idChange = changes.queryId;
    if (idChange && !idChange.firstChange && this.visiable) {
      this.detailUrl = `live/sys/host/auth/${this.queryId}`;
      this.fetchDetail();
    }
  }

  beforeSubmit() {
  }
}
