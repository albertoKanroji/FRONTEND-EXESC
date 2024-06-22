import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposStudentComponent } from './grupos-student.component';

describe('GruposStudentComponent', () => {
  let component: GruposStudentComponent;
  let fixture: ComponentFixture<GruposStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GruposStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
