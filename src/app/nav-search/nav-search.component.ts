import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})

export class NavSearchComponent implements OnInit {
  @Input() show: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(query) {
    this.router.navigateByUrl('/search/' + query)
    if(!this.show) {
      $('.sidenav').sidenav('close');
    }
  }

}
