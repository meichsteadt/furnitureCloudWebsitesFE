import { Component } from '@angular/core';
import { EditService } from './edit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EditService]
})
export class AppComponent  {

  constructor(private editService: EditService) {}
}
