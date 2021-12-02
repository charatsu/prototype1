import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTPLComponent } from './ctpl.component';

describe('CTPLComponent', () => {
  let component: CTPLComponent;
  let fixture: ComponentFixture<CTPLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTPLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CTPLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
