import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Store } from '../store.model';
import { Location } from '../location.model';
import { Delivery } from '../delivery.model';
import { Review } from '../review.model';
import { StoreService } from '../store.service';
import { DeliveryService } from '../delivery.service';

declare var $: any;

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
  providers: [DeliveryService, StoreService]
})
export class StoreDetailsComponent implements OnInit, AfterViewInit {
  stores: Store[] = [];
  locations: Location[] = [];
  reviews: Review[] = [];
  deliveries: Delivery[] = [];
  images: String[] = [];
  carouselInit: boolean = false;
  gmaps: String = this.storeService.store.googleMaps;

  constructor(private storeService: StoreService, private deliveryService: DeliveryService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.stores = this.storeService.getStores();
    this.locations = this.storeService.getLocations();
    this.deliveries = this.deliveryService.getDeliveries();
    this.images = this.storeService.getImages();
    this.reviews = this.storeService.getReviews();

    $(function() {
      $('.scrollspy').scrollSpy({scrollOffset: 200});
      $('.sidenav').sidenav('close');
    })
  }

  ngAfterViewInit() {
    $(document).ready(function() {
    })
  }

  numCols() {
    return "l" +  12 / this.locations.length
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
          $('.scrollspy').scrollSpy({scrollOffset: 200});

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
