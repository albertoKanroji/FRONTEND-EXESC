import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberacionesComponent } from './liberaciones.component';

describe('LiberacionesComponent', () => {
  let component: LiberacionesComponent;
  let fixture: ComponentFixture<LiberacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiberacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiberacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
