import { Component, OnInit } from '@angular/core';
import { Mattress } from '../mattress.model';
import { MattressService } from '../mattress.service';

declare var $: any;

@Component({
  selector: 'app-mattresses',
  templateUrl: './mattresses.component.html',
  styleUrls: ['./mattresses.component.scss'],
  providers: [MattressService]
})
export class MattressesComponent implements OnInit {
  mattresses: Mattress[];
  size: string = 'all';
  minPrice: number = 0;
  maxPrice: number = 3000;
  search: boolean = false;
  constructor(private mattressSerivce: MattressService) { }

  ngOnInit() {
    $(function() {
      $('#sizes').formSelect();
    })
    this.getMattresses();
  }

  getMattresses() {
    this.mattresses = this.mattressSerivce.getMattresses(this.size, this.minPrice, this.maxPrice);
  }

  filterSize(event) {
    this.search = false;
    this.size = event.target.value;
    this.getMattresses();
    setTimeout(() => {
      this.search = true;
    }, 500)
  }

  setMin(event) {
    this.search = false;
    this.minPrice = event.target.value;
    this.getMattresses();
    setTimeout(() => {
      this.search = true;
    }, 500)
  }

  setMax(event) {
    this.search = false;
    this.maxPrice = event.target.value;
    this.getMattresses();
    setTimeout(() => {
      this.search = true;
    }, 500)
  }

}
