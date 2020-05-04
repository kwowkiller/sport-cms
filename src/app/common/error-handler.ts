import {ErrorHandler as DefaultErrorHandler, Injectable} from '@angular/core';

// 全局错误捕获处理
@Injectable()
export class ErrorHandler implements DefaultErrorHandler {
  constructor() {
  }

  handleError(error): void {
    console.warn(error);
  }
}

