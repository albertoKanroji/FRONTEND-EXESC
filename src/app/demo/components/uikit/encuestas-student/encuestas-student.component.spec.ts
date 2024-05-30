import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasStudentComponent } from './encuestas-student.component';

describe('EncuestasStudentComponent', () => {
  let component: EncuestasStudentComponent;
  let fixture: ComponentFixture<EncuestasStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestasStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncuestasStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
