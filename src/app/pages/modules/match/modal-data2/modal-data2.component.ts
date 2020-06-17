import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {MatchItem, MatchType} from '../match.module';

@Component({
  selector: 'app-match-modal-data2',
  templateUrl: './modal-data2.component.html',
  styleUrls: ['./modal-data2.component.css']
})
export class ModalData2Component extends ModalForm<MatchItem> implements OnInit, OnChanges {
  @Input()
  type: MatchType;
  footballStats: Item3[] = [];
  basketballStats: number[][] = [];
  home: Item1;
  away: Item1;

  constructor(protected http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.visiable && this.queryId) {
      this.loading = true;
      this.http.get<{
        code, data: FootballModel | BasketballModel,
      }>(`match/sys/${this.type}/match/detail/${this.queryId}`).pipe(
        finalize(() => this.loading = false)
      ).subscribe(event => {
        if (this.type === 'football') {
          this.footballStats = (event.data as FootballModel).stats;
          this.home = (event.data as FootballModel).home_team;
          this.away = (event.data as FootballModel).away_team;
        }
        if (this.type === 'basketball') {
          this.home = (event.data as BasketballModel).hometeam;
          this.away = (event.data as BasketballModel).awayteam;
          this.basketballStats = (event.data as BasketballModel).stats;
        }
      });
    }
  }

  beforeSubmit() {
  }

  /*
      足球
   1  进球
   2  角球
   3  黄牌
   4  红牌
   5  界外球
   6  任意球
   7  球门球
   8  点球
   9  换人
   10  比赛开始
   11  中场
   12  结束
   13  半场比分
   15  两黄变红
   16  点球未进
   17  乌龙球
   19  伤停补时
   21  射正
   22  射偏
   23  进攻
   24  危险进攻
   25  控球率
   26  加时赛结束
   27  点球大战结束
   篮球
   1	3分球进球数	篮球技术统计
   2	2分球进球数	篮球技术统计
   3	罚球进球数	篮球技术统计
   4	剩余暂停数	篮球技术统计
   5	犯规数	篮球技术统计
   6	罚球命中率	篮球技术统计
   7	总暂停数	篮球技术统计
   */
  getStat(team: 'home' | 'away', type: number): number {
    if (this.type === 'football') {
      const find = this.footballStats.find(item => item.type === type);
      if (find) {
        return team === 'home' ? find.home : find.away;
      }
    }
    if (this.type === 'basketball') {
      const find = this.basketballStats.find(item => item[0] === type);
      if (find) {
        return team === 'home' ? find[1] : find[2];
      }
    }
    return 0;
  }
}

interface FootballModel {
  away_team: Item1;
  home_team: Item1;
  info: {
    matchtime: number;
    realtime: number;
    round: number;
    statusid: number;
  };
  matchevent: {
    id: number;
    name_zh: string;
    season: string;
  };
  // 技术统计
  stats: Item3[];
  tlive: Item2[];
}

interface BasketballModel {
  awayteam: Item1;
  hometeam: Item1;
  // [
  //     1,//统计类型，请参考 状态码->篮球技术统计
  //     8,//主队数值
  //     10//客队数值
  //   ],
  stats: number[][];
}

interface Item1 {
  half_score: number;
  id: number;
  logo: string;
  name_zh: string;
  score: number;
}

interface Item2 {
  data: string;
  position: number;
  time: string;
  type: number;
}

interface Item3 {
  // 主队值
  home: number;
  // 客队值
  away: number;
  type: number;
}
