import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../store.service';

declare var $: any;

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.scss'],
  providers: [StoreService]
})
export class RequestInfoComponent implements OnInit {
  @Input() productId: number;
  store = this.storeService.store;

  constructor(private storeService: StoreService) { }
  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  onSubmit(name, email, note) {
    this.storeService.requestInfo(name, email, this.productId, note).subscribe(res => {}, error => this.handleError(error), () => this.success())
  }

  handleError(error) {
    $("#error").show();
  }

  success() {
    $("#infoRequest").hide();
    $("#success").show();
  }
}
