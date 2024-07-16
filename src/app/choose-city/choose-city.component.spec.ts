import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCityComponent } from './choose-city.component';

describe('ChooseCityComponent', () => {
  let component: ChooseCityComponent;
  let fixture: ComponentFixture<ChooseCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseCityComponent]
    });
    fixture = TestBed.createComponent(ChooseCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
