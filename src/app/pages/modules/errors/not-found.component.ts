import {Component} from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container">
      <h1>404</h1>
      <h2>当前页面不存在</h2>
    </div>`,
  styles: [
    '.container{height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center}',
    'h1{font-size: 64px}'
  ]
})
export class NotFoundComponent {
}
