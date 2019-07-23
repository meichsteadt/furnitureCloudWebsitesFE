import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SetType } from '../set-type.model';
import { SetTypeService } from '../set-type.service';

@Component({
  selector: 'app-set-types',
  templateUrl: './set-types.component.html',
  styleUrls: ['./set-types.component.scss'],
  providers: [SetTypeService]
})
export class SetTypesComponent implements OnInit {
  category: string;
  parentCategory: string;
  setTypes: SetType[] = [];
  constructor(private setTypeService: SetTypeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.category = urlParameters['categoryName'];
      this.parentCategory = urlParameters['parentCategory'];

      this.setTypeService.getSetTypes(this.category, this.parentCategory).subscribe((response: Array<any>) => {
        for(var i = 0; i < response.length; i++) {
          var setType = response[i];
          this.setTypes.push(new SetType(
            setType["id"],
            setType["name"],
            setType["image"],
          ))
        }
      });
    })

  }

}
