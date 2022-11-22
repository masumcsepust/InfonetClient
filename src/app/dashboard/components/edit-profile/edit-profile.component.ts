import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalService } from 'src/app/services/personal.service';
import { city, country } from '../../dashboard.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  formGroup: FormGroup;

  country: any[] = country;
  city: any[] = [];
  languageSkills = ["C#", "C++", "Java", "PHP", "SQL"];
  defaultLanguages: any = [];
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
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.city = city.filter(x => x.countryCode == data.countryCode);
      this.defaultLanguages = data.languageSkills.split(",");
      this.reactiveForm();
  }
  ngOnInit(): void {
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
      Id: [this.data.id],
      name: [this.data.name, Validators.minLength(3)],
      countryCode: [this.data.countryCode],
      cityCode: [this.data.cityCode],
      DateOfBirth: [this.data.dateOfBirth, Validators.required],
      languageSkills: this.fb.array(
        this.languageSkills.map(x => this.defaultLanguages.indexOf(x) > -1)
      ),
    })
  }

  onChange(event) {
    this.fileToUpload = event.target.files[0];
  }

  onSubmit() {
    let birthday = this.transformDate(this.formGroup.controls["DateOfBirth"].value);
    const formData: FormData = new FormData();
    formData.append('Id', this.data.id);
    formData.append('Name', this.formGroup.value.name);
    formData.append('CountryCode', this.formGroup.value.countryCode);
    formData.append('CityCode', this.formGroup.value.cityCode);
    formData.append('DateOfBirth', birthday);
    formData.append('LanguageSkills', this.convertToValue("languageSkills").join(','));

    this.personalService.updatePersonal(formData).subscribe(res => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })

    // console.log("data", valueToStore);
  }

  private transformDate(value: any) {
    return this.datePipe.transform(value, 'MM-dd-yyyy');
  }

  get name() {
    return this.formGroup.get('name')!;
  }

  public validate(): void {
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick() {
    this.dialogRef.close();
  }
}
