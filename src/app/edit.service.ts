import { Injectable, EventEmitter } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()

export class EditService {
  private model$ = new Subject<string>();

  modelObs = this.model$.asObservable();

  constructor(){
  }

  setModel(model) {
    this.model$.next(model["name"]);
  }

  // getModel(): Observable<string> {
  //   // return this.model$.asObservable();
  // }
}
