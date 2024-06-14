import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosAdminComponent } from './alumnos-admin.component';

describe('AlumnosAdminComponent', () => {
  let component: AlumnosAdminComponent;
  let fixture: ComponentFixture<AlumnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
