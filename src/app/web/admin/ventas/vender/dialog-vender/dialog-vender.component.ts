import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-vender',
  templateUrl: './dialog-vender.component.html',
  styleUrls: ['./dialog-vender.component.scss']
})
export class DialogVenderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogVenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
