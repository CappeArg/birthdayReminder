import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerscrudComponent } from './customerscrud.component';

describe('CustomerscrudComponent', () => {
  let component: CustomerscrudComponent;
  let fixture: ComponentFixture<CustomerscrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerscrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerscrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
