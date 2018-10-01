import { Component, OnInit } from '@angular/core';
import { Store } from '../store.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [StoreService]
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();
  store: Store;
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getStore().subscribe(response => {
      this.store = new Store(
        response["name"],
        response["address"],
        response["city"],
        response["state"],
        response["zip"],
        response["phone"],
        response["email"],
        response["hours"],
        response["google_maps"]
      )
    })
  }

}
