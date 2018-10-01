import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Object[] = [];
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      var partialUrl = ""
      this.breadcrumbs = [];
      for (let i = 0; i < url.length; i++) {
        partialUrl += "/"
        partialUrl += url[i]["path"]
        this.breadcrumbs.push({name: url[i]["path"], url: partialUrl});
      }
    })
  }

  active(url) {
    return (url === this.router.url ? true : false)
  }

}
