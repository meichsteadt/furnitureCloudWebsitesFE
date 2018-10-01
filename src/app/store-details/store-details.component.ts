import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '../store.model';
import { Delivery } from '../delivery.model';
import { Review } from '../review.model';
import { StoreService } from '../store.service';
import { DeliveryService } from '../delivery.service';

declare var $: any;

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
  providers: [StoreService, DeliveryService]
})
export class StoreDetailsComponent implements OnInit, AfterViewInit {
  stores: Store[];
  reviews: Review[];
  deliveries: Delivery[];
  images: String[];
  carouselInit: boolean = false;
  constructor(private storeService: StoreService, private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.stores = this.storeService.getStores();
    this.deliveries = this.deliveryService.getDeliveries();
    this.images = this.storeService.getImages();
    this.reviews = this.storeService.getReviews();

    $(function() {
      $('.sidenav').sidenav('close');
      $('.scrollspy').scrollSpy({scrollOffset: 200});
    })
  }

  ngAfterViewInit() {
    $(document).ready(function() {
    })
  }

  numCols() {
    return "l" +  12 / this.stores.length
  }

  showHours(hours) {
    var html = "";
    for(var i = 0; i < hours.length; i ++) {
      html += hours[i];
      html += "<br>";
    }
    return html
  }

  ready() {
    if(this.images.length > 0) {
      if(!this.carouselInit) {
        setTimeout(i => {
          $('.carousel').carousel({fullWidth: true, indicators: true});
        }, 500)
        this.carouselInit = true;
      }
      return true;
    }
    else {
      return false;
    }
  }

}
