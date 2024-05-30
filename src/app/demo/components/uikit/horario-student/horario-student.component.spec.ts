import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioStudentComponent } from './horario-student.component';

describe('HorarioStudentComponent', () => {
  let component: HorarioStudentComponent;
  let fixture: ComponentFixture<HorarioStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorarioStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
