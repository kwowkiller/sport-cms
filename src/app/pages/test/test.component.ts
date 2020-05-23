import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=10';
  optionList: string[] = [];
  selectedUser = null;
  isLoading = false;
  // tslint:disable:no-any
  getRandomNameList: Observable<string[]> = this.http
    .get(`${this.randomUserUrl}`)
    .pipe(map((res: any) => res.results))
    .pipe(
      map((list: any) => {
        return list.map((item: any) => `${item.name.first}`);
      })
    );

  loadMore(): void {
    this.isLoading = true;
    this.getRandomNameList.subscribe(data => {
      this.isLoading = false;
      this.optionList = [...this.optionList, ...data];
    });
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadMore();
  }

}
