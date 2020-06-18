import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {LevelConfig} from '../../pages/modules/user/user.module';
import {CustomInput} from '../../frame/custom-input';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-level-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LevelSelectComponent,
      multi: true
    },
  ],
  template: `
    <nz-select
      nzShowSearch
      [nzLoading]="loading"
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
      nzAllowClear
    >
      <nz-option
        *ngFor="let item of selectData"
        [nzLabel]="item.levelName"
        [nzValue]="item.id"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class LevelSelectComponent extends CustomInput implements OnInit {
  selectData: LevelConfig[] = [];
  loading = false;

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<LevelConfig[]>('app/sys/app/user/level').pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event;
    });
  }

}
