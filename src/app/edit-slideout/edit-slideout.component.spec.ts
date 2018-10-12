import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlideoutComponent } from './edit-slideout.component';

describe('EditSlideoutComponent', () => {
  let component: EditSlideoutComponent;
  let fixture: ComponentFixture<EditSlideoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSlideoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSlideoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
