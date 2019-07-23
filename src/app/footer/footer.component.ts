import { Component, OnInit } from '@angular/core';
import { Store } from '../store.model';
import { StoreAuthService } from '../store-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: []
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();
  store = this.storeService.store;
  constructor(private storeService: StoreAuthService) { }

  ngOnInit() {
  }

}
