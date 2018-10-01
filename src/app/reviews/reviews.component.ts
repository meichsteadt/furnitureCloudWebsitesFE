import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../review.model';

declare var $: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  carouselInit: boolean = false;

  @Input() reviews: Review[];
  constructor() { }

  ngOnInit() {
    // setTimeout(i => {
    //   $('#review-carousel').carousel({fullWidth: true, indicators: true});
    // }, 500);
  }

}
