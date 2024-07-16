import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputWeatherComponent } from './output-weather.component';

describe('OutputWeatherComponent', () => {
  let component: OutputWeatherComponent;
  let fixture: ComponentFixture<OutputWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputWeatherComponent]
    });
    fixture = TestBed.createComponent(OutputWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
