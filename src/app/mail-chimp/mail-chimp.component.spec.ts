import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MailChimpComponent } from './mail-chimp.component';

describe('MailChimpComponent', () => {
  let component: MailChimpComponent;
  let fixture: ComponentFixture<MailChimpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MailChimpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailChimpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
