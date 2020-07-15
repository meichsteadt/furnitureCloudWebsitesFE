import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category.model';
import { Promotion } from '../promotion.model';
import { Store } from '../store.model';

declare var M: any;
declare var $: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() categories: Category[];
  @Input() store: Store;
  @Input() promotions: Promotion[];
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('#slide-out').sidenav();
    });
  }

  closeSideNav(){
    $('#departments-slide-out').sidenav('close');
    $('#promos-slide-out').sidenav('close');
  }

}
