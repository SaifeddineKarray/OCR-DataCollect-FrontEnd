import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpdPageComponent } from './lpd-page.component';

describe('LpdPageComponent', () => {
  let component: LpdPageComponent;
  let fixture: ComponentFixture<LpdPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LpdPageComponent]
    });
    fixture = TestBed.createComponent(LpdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
