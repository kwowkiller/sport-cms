import {Component, OnInit} from '@angular/core';
import {Role} from '../system.module';
import {Pageable} from '../../../../common/common.model';
import {HttpClient} from '@angular/common/http';
import {CustomInput} from '../../../../frame/custom-input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-role-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RoleSelectComponent,
      multi: true
    },
  ],
  template: `
    <nz-select
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
      [nzLoading]="loading"
    >
      <nz-option
        *ngFor="let item of selectData"
        [nzLabel]="item.roleName"
        [nzValue]="item.roleId"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class RoleSelectComponent extends CustomInput implements OnInit {
  selectData: Role[] = [];
  loading = false;

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<Pageable<Role>>('admin/system/role/page', {
      params: {pageNumber: '1000'}
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event.data.records;
    });
  }
}
