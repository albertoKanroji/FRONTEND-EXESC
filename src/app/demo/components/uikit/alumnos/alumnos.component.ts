import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
  providers: [MessageService]
})
export class AlumnosComponent implements OnInit {
    student: any = {};
    countries: any[] = [];
    studentForm: FormGroup;

    cities: SelectItem[] = [];
    paymentOptions: any[] = [];
  constructor(private alumnosService: AlumnosService,   private fb: FormBuilder,private messageService: MessageService,private countryService: CountryService,) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        name: ['', Validators.required],
        last_name: ['', Validators.required],
        mother_last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        control_number: ['', Validators.required],
        status: [false],
        profile: [''],
        careers_id: [null, Validators.required]
      });
    const studentId = localStorage.getItem('id');
    if (studentId) {
      this.getStudentById(parseInt(studentId, 10));
    } else {
      console.log('No ID found in localStorage');
    }
    this.countryService.getCountries().then(countries => {
        this.countries = countries;
    });

    this.cities = [
        { label: 'INGENIRIA EN SISTEMAS', value: { id: 1, name: 'New York', code: 'NY' } },
        { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
        { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
        { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
        { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];

    this.paymentOptions = [
        { name: 'Option 1', value: 1 },
        { name: 'Option 2', value: 2 },
        { name: 'Option 3', value: 3 }
    ];
  }

  getStudentById(id: number): void {
    this.alumnosService.getStudentById(id).subscribe(
      response => {
        if (response.success) {
          this.studentForm.patchValue(response.data);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Student data loaded successfully'});
        }
        console.log('Student data:', response);
      },
      error => {
        console.error('Error fetching student data:', error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to load student data'});
      }
    );
  }
  onBasicUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}
}
