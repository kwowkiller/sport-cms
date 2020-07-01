import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {LevelConfig} from '../user.module';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-level-config',
  templateUrl: './level-config.component.html',
  styles: []
})
export class LevelConfigComponent implements OnInit {
  list: LevelConfig[] = [];
  // 对比不同  提交修改过的
  private compare: LevelConfig[] = [];
  editable = false;
  loading = false;
  submitting = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.loading = true;
    this.http.get<LevelConfig[]>('app/sys/app/user/level').pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.list = JSON.parse(JSON.stringify(event));
      this.compare = JSON.parse(JSON.stringify(event));
    });
  }

  submit() {
    const request = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].fromExpireValue === this.compare[i].fromExpireValue
        && this.list[i].toExpireValue === this.compare[i].toExpireValue) {
        continue;
      }
      const body = this.list[i];
      request.push(this.http.put(`app/sys/user/level/update`, {
        id: body.id,
        levelImage: body.levelImage,
        levelName: body.levelName,
        fromExpireValue: body.fromExpireValue,
        toExpireValue: body.toExpireValue,
      }));
    }
    if (request.length !== 0) {
      this.submitting = true;
      forkJoin(request).pipe(
        finalize(() => {
          this.submitting = false;
          this.editable = false;
        })
      ).subscribe(event => {
        this.fetchList();
      });
    } else {
      this.editable = false;
    }
  }
}
