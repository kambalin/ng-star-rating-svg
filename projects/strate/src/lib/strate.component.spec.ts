import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrateComponent } from './strate.component';

describe('StrateComponent', () => {
  let component: StrateComponent;
  let fixture: ComponentFixture<StrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
