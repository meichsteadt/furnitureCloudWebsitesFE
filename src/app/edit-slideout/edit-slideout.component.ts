import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EditService } from '../edit.service';
import { Subscription }   from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-edit-slideout',
  templateUrl: './edit-slideout.component.html',
  styleUrls: ['./edit-slideout.component.scss'],
  providers: []
})
export class EditSlideoutComponent implements OnInit, OnChanges {
  @Input() model: any;
  @Input() modelType: any;

  constructor(public editService: EditService) {

  }

  ngOnInit() {
  }

  ngOnChanges() {
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
