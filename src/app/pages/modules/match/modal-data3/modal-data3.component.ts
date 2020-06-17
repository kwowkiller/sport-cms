import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {MatchItem, MatchType} from '../match.module';

@Component({
  selector: 'app-match-modal-data3',
  templateUrl: './modal-data3.component.html',
  styles: []
})
export class ModalData3Component extends ModalForm<MatchItem> implements OnInit, OnChanges {
  @Input()
  type: MatchType;
  tabIndex = 0;
  data: Model;

  // 欧指
  get eu() {
    return this.data.eu;
  }

  get list(): Item2[] {
    if (!this.data) {
      return [];
    }
    switch (this.tabIndex) {
      case 0:
        return this.data.asia;
      case 1:
        return this.data.eu.company;
      case 2:
        return this.data.bs;
    }
  }

  constructor(protected http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.visiable && this.queryId) {
      this.loading = true;
      this.http.get<{ code, data: Model }>(`match/sys/${this.type}/match/odds/${this.queryId}`).pipe(
        finalize(() => this.loading = false)
      ).subscribe(event => {
        this.data = event.data;
      });
    }
  }

  beforeSubmit() {
  }
}

interface Model {
  // 让球
  asia: Item2[];
  // 大小球
  bs: Item2[];
  // 欧指
  eu: {
    avg: Item1,
    max: Item1,
    min: Item1,
    company: Item2[],
  };
}

interface Item1 {
  first: [];
  last: [];
}

interface Item2 extends Item1 {
  company: string;
}
