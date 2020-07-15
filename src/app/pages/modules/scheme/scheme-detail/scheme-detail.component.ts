import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-scheme-detail',
  templateUrl: './scheme-detail.component.html',
  styleUrls: ['./scheme-detail.component.less']
})
export class SchemeDetailComponent extends ModalForm<{
  id, matchId, position, anAlyze, money, gameType, nickname, matchName
}> implements OnInit, OnChanges {
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
        if (this.detail.gameType === 1) {
          this.detail2 = event.data.find(i => i.gameType === 1);
        } else {
          this.detail2 = event.data.find(i => i.gameType === 2);
        }
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
  // 让球数 主队  客队取反
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
  // 下面 逗号分隔  4个
  rq: string;
  sellStatus: string;
  sfc: any;
  // 上面  逗号分隔  3个  第一个写死0
  spf: string;
}
