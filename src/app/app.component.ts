import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  public form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    protected cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.form = this.formBuilder.group({
      datepicker: [new Date(), Validators.required],
    });

    this.form.valueChanges.subscribe((value) => {
      console.log('valueChanges form', value);
    });
    this.form.get('datepicker').valueChanges.subscribe((value) => {
      console.log('valueChanges datepicker', value);
    });
    // this.cdr.detectChanges();
  }

}
