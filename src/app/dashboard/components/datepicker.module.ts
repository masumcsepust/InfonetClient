import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatepickerInputComponent } from './datepicker-input/datepicker-input.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    DatepickerInputComponent,
    UserProfileComponent,
    EditProfileComponent,
    DeleteProfileComponent,
  ],
  exports: [
    DatepickerInputComponent,
  ],
  providers: [
    DatePipe,
  ],
})
export class DatepickerModule { }