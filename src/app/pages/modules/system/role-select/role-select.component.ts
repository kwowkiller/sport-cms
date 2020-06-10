import {Component, OnInit} from '@angular/core';
import {Role} from '../system.module';
import {Pageable} from '../../../../common/common.model';
import {HttpClient} from '@angular/common/http';
import {CustomInput} from '../../../../frame/custom-input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {PermissionService} from '../../../../services/permission.service';

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
        *ngFor="let item of permissionService.roles"
        [nzLabel]="item.roleName"
        [nzValue]="item.roleId"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class RoleSelectComponent extends CustomInput implements OnInit {
  loading = false;

  constructor(
    public permissionService: PermissionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.permissionService.fetchRoles().then();
  }
}
