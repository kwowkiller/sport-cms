import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {LevelConfig} from '../user.module';

@Component({
  selector: 'app-level-config',
  templateUrl: './level-config.component.html',
  styles: []
})
export class LevelConfigComponent implements OnInit {
  list: LevelConfig[] = [];
  editable = false;
  loading = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<LevelConfig[]>('app/sys/app/user/level').pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.list = event;
    });
  }

  submit() {
  }
}
