import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PldPageComponent } from './pld-page.component';

describe('PldPageComponent', () => {
  let component: PldPageComponent;
  let fixture: ComponentFixture<PldPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PldPageComponent]
    });
    fixture = TestBed.createComponent(PldPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
