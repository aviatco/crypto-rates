import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoutboxComponent } from './shoutbox.component';

describe('ShoutboxComponent', () => {
  let component: ShoutboxComponent;
  let fixture: ComponentFixture<ShoutboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoutboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
