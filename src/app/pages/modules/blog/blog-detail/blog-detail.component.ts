import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  @Input()
  queryId: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
