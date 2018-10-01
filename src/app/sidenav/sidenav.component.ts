import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category.model';
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
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
  }

  closeSideNav(){
    $('#departments-slide-out').sidenav('close');
  }

}
