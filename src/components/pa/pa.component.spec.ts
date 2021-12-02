import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAComponent } from './pa.component';

describe('PAComponent', () => {
  let component: PAComponent;
  let fixture: ComponentFixture<PAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
