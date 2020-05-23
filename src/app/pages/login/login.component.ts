import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {finalize} from 'rxjs/operators';
import {Session} from '../../common/session';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  codeUrl = environment.baseUrl + 'auth/captcha?key=' + new Date().getTime();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private message: NzMessageService,
  ) {
    this.form = this.fb.group({
      username: ['ssl', [Validators.required]],
      password: ['1234qwer', [Validators.required]],
      code: ['', [Validators.required]],
      key: [new Date().getTime()],
      grant_type: ['password'],
    });
  }

  ngOnInit(): void {
  }

  refreshCode() {
    this.codeUrl = `${environment.baseUrl}auth/captcha?key=${new Date().getTime()}`;
  }

  submitForm() {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (!this.form.valid) {
      return;
    }
    this.submitting = true;
    this.http.post<{
      access_token: string,
      expires_in: number,
      jti: string,
      refresh_token: string,
      scope: string,
      token_type: string,
    }>('auth/oauth/token', this.form.value).pipe(
      finalize(() => this.submitting = false)
    ).subscribe(event => {
      Session.token = `${event.token_type} ${event.access_token}`;
      this.router.navigateByUrl('/').then();
    });
  }

  // 加载验证码失败
  onCodeImageError() {
    this.message.warning('验证码加载失败，可能服务器已关闭或错误');
  }
}
