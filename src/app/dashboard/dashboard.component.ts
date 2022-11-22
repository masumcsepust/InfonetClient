import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PersonalService } from '../services/personal.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import Swal from 'sweetalert2'
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

export const country = [
  {Code: "BD", Name: "Bangladesh"},
  {Code: "IN", Name: "India"}
];

export const   city = [
  {Code: "DK", Name: "Dhaka", countryCode: "BD"},
  {Code: "CT", Name: "Chittagong", countryCode: "BD"},
  {Code: "MB", Name: "Mumbay", countryCode: "IN"},
  {Code: "KT", Name: "Kolkata", countryCode: "IN"}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DashboardComponent),
      multi: true,
    },
  ],
})


export class DashboardComponent implements OnInit {
  formGroup: FormGroup;

  country: any[] = country;
  city: any[] = [];
  languageSkills = ["C#", "C++", "Java", "PHP", "SQL"];
  defaultLanguages = ["C#"];
  fileToUpload: any;
  personalInformationList: any[] = [];
  // private onChange: any = () => { }
   value: string = '';
   countryName: string = '';
   cityName: string = '';
  constructor(private fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private personalService: PersonalService,
    public dialog: MatDialog) {
    // const defaultCities = ["Mohali", "Amritsar"];
  }
  ngOnInit(): void {
    this.getDataList();
    this.reactiveForm();
  }

  getDataList() {
    this.personalService.getDataList().subscribe((res:any) => {
      this.personalInformationList = res;
    })
  }

  selectCountry(code) {
    this.city = city.filter(x => x.countryCode == code.value);
  }

  convertToValue(key: string) {
    return this.formGroup.value[key]
      .map((x, i) => x && this[key][i])
      .filter(x => !!x);
  }

  reactiveForm() {
    this.formGroup = this.fb.group({
      Id: 0,
      name: ['', Validators.minLength(3)],
      countryCode: [''],
      cityCode: [''],
      DateOfBirth: [new Date(), Validators.required],
      languageSkills: this.fb.array(
        this.languageSkills.map(x => this.defaultLanguages.indexOf(x) > -1),
        Validators.minLength(1)
      ),
    })
  }

  onChange(event) {
    this.fileToUpload = event.target.files[0];
  }

  onSubmit() {
    let birthday = this.transformDate(this.formGroup.controls["DateOfBirth"].value);
    const formData: FormData = new FormData();
    formData.append('Id', '0');
    formData.append('Name', this.formGroup.value.name);
    formData.append('CountryCode', this.formGroup.value.countryCode);
    formData.append('CityCode', this.formGroup.value.cityCode);
    formData.append('DateOfBirth', birthday);
    formData.append('LanguageSkills', this.convertToValue("languageSkills").join(','));
    formData.append('File', this.fileToUpload);

    this.personalService.createPersonal(formData).subscribe(res => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })

    // console.log("data", valueToStore);
  }

  viewRowData(row) {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editRowData(row) {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteRowData(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personalService.deleteData(row.id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });
      }
    })
  }

  private transformDate(value: any) {
    return this.datePipe.transform(value, 'MM-dd-yyyy');
  }

  getValidity(i) {
    return (<FormArray>this.formGroup.get('languageSkills')).controls[i].invalid;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  get name() {
    return this.formGroup.get('name')!;
  }
  get languageSkill() {
    return this.formGroup.get('languageSkills')!;
  }

  public validate(): void {
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }
  }
}
