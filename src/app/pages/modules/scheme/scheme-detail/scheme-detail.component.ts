import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {AuditItem} from '../scheme.module';

@Component({
  selector: 'app-scheme-detail',
  templateUrl: './scheme-detail.component.html',
  styleUrls: ['./scheme-detail.component.less']
})
export class SchemeDetailComponent extends ModalForm<AuditItem> implements OnInit, OnChanges {
  @Input()
  showAudit = false;
  detail2: Detail2;

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({
      remark: [null],
      status: [0, [Validators.required]],
    });
    this.submitUrl = 'match/sys/match/programApply';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.detail && this.visiable) {
      this.http.get<{ code, data: Detail2[] }>(`match/sys/match/program/playing/${this.detail.matchId}`).subscribe(event => {
        this.detail2 = event.data[0];
      });
    }
  }

  beforeSubmit() {
    if (this.showAudit) {
      this.form.value.programApplyId = this.detail.id;
    }
  }
}

interface Detail2 {
  awayLogo: string;
  awayName: string;
  awayOdd: number;
  comp: string;
  count: any;
  dxf: any;
  gameType: number;
  goal: number;
  homeLogo: string;
  homeName: string;
  homeOdd: number;
  id: number;
  isCast: any;
  issue: number;
  issueNum: number;
  matchId: number;
  matchTime: number;
  matchType: number;
  rf: any;
  rq: any;
  sellStatus: string;
  sfc: any;
  spf: any;
}
