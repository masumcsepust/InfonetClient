import { DatePipe } from '@angular/common';
import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerInputComponent),
      multi: true,
    },
  ],
})
export class DatepickerInputComponent implements ControlValueAccessor, OnInit {

  private onChange: any = () => { }
  private onTouched: any = () => { }
   value: string = '';
  // private ngControl: NgControl;

  constructor(
    private datePipe: DatePipe,
    // private injector: Injector,
  ) { }

  ngOnInit() {
    // this.ngControl = this.injector.get(NgControl);
  }

  public bsValueChange(value) {
    this.writeValue(this.value);
    this.onTouched();
  }

  public writeValue(value: any) {
    this.value = this.transformDate(value);
    this.onChange(this.value);
    console.log('writeValue', 'old: ' + value, 'new: ' + this.value);
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
    this.onChange(this.value); // for OnInit cycle
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    //
  }

  private transformDate(value: any) {
    return this.datePipe.transform(value, 'MM-dd-yyyy');
  }

}