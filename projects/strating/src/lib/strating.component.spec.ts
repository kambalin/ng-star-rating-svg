import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratingComponent } from './strating.component';

describe('StratingComponent', () => {
  let component: StratingComponent;
  let fixture: ComponentFixture<StratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
