import { Component, OnInit } from '@angular/core';
import { Size } from '../size.model';
import { Mattress } from '../mattress.model';
import { MattressService } from '../mattress.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-mattress-details',
  templateUrl: './mattress-details.component.html',
  styleUrls: ['./mattress-details.component.scss'],
  providers: [MattressService]
})
export class MattressDetailsComponent implements OnInit {
  mattressId: number;
  mattress: Mattress;
  sizes: Size[];
  constructor(private mattressService: MattressService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.mattressId = urlParameters['id'];

      this.mattressService.getMattress(this.mattressId).subscribe(response => {
        var mattress = response["mattress"];
        var price = response["price"];
        this.mattress = new Mattress(
          mattress["id"],
          mattress["name"],
          mattress["comfort"],
          mattress["image"],
          mattress["description"],
          mattress["warranty"],
          mattress["brand_id"],
          price["price"],
          price["name"]
        );
      });

      this.sizes = this.mattressService.getSizes(this.mattressId);
    });

    $(document).ready(function(){
      $('.materialboxed').materialbox();
      $('.collapsible').collapsible({accordion: false});
      $('.collapsible').collapsible('open');
      $('html,body').scrollTop(0);
    });
  }

}
