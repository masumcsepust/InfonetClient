import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    onNoClick(): void {
      this.dialogRef.close();
    }
    //   @Inject(MAT_DIALOG_DATA) public data: DialogData,)
  // public dialogRef: MatDialogRef<UserProfileComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogData,
}
