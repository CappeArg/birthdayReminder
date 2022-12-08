import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysCardComponent } from './todays-card.component';

describe('TodaysCardComponent', () => {
  let component: TodaysCardComponent;
  let fixture: ComponentFixture<TodaysCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
