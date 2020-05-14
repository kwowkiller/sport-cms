import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {MatchItem} from '../match.module';

@Component({
  selector: 'app-match-modal-data1',
  templateUrl: './modal-data1.component.html',
  styles: []
})
export class ModalData1Component extends ModalForm<MatchItem> implements OnInit, OnChanges {
  // 历史交锋
  history: Item1[] = [];
  // 进球分布
  distribution: Item3[] = [];

  constructor(protected http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.visiable && this.queryId) {
      this.loading = true;
      this.http.get<{
        code, data: Model,
      }>(`match/sys/football/match/data/${this.queryId}`).pipe(
        finalize(() => this.loading = false)
      ).subscribe(event => {
        this.history = event.data.historyMatch;
        this.distribution = event.data.goalDistribution;
      });
    }
  }

  beforeSubmit() {
  }
}

interface Model {
  asAwayTeamMatch: Item1[];
  asAwayTeamMatchScore: Item2;
  asHomeTeamMatch: Item1[];
  asHomeTeamMatchScore: Item2;
  goalDistribution: Item3[];
  historyMatch: Item1[];
  historyMatchScore: Item4;
}

interface Item1 {
  awayTeamHalf: number;
  awayTeamName: string;
  awayTeamScore: number;
  date: string;
  eventName: string;
  homeTeamHalf: number;
  homeTeamName: string;
  homeTeamScore: number;
  rate: string;
}

interface Item2 {
  fail: number;
  falt: number;
  success: number;
}

interface Item3 {
  footballTeam: string;
  scored: number[];
  totalScore: number;
}

interface Item4 {
  awayFail: number;
  awayFalt: number;
  awaySuccess: number;
  homeFail: number;
  homeFalt: number;
  homeSuccess: number;
}
