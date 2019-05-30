import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EditService } from '../edit.service';
import { Subscription }   from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-edit-slideout',
  templateUrl: './edit-slideout.component.html',
  styleUrls: ['./edit-slideout.component.scss'],
  providers: [EditService]
})
export class EditSlideoutComponent implements OnInit, OnDestroy {
  model: any;
  subscription: Subscription;
  models: string[] = [];

  constructor(public editService: EditService) {
    this.subscription = this.editService.modelObs.subscribe(model => {
      this.models.push(model)
      this.model = model;
    }, error => console.log(error))
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  closeEdit() {
    // $("#main").removeClass("edit");
    // $("#slideout").removeClass("edit");
  }

  receiveModel() {

  }

  sendModel(model) {

  }
}
