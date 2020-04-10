import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserActionsComponent } from '../user-actions/user-actions.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'modal-auth-component',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss']
})
export class ModalAuthComponent implements OnInit{
  formStep1: FormGroup;
  formStep2: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserActionsComponent>,
    private _fb : FormBuilder,
    // @Inject(MAT_DIALOG_DATA) public data:
  ) { }

  ngOnInit(){
    this.generaFormStep1();
    this.generaFormStep2();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  private generaFormStep1(){
    this.formStep1 = this._fb.group({
      email: [null, Validators.required, Validators.email],
    });
  }
  private generaFormStep2(){
    this.formStep2 = this._fb.group({
      password : [null, Validators.required]
    });
  }
}
