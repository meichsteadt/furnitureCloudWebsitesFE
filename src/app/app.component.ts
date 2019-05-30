import { Component } from '@angular/core';
import { EditService } from './edit.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EditService, UserService]
})
export class AppComponent  {
  ready: boolean = false;
  constructor(private editService: EditService, private userService: UserService) {
    this.userService.getUser().then((user) => this.ready = true);
  }
}
