import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-columns',
  templateUrl: './add-columns.component.html',
  styleUrls: ['./add-columns.component.scss']
})
export class AddColumnsComponent {
  columnForm: FormGroup;
  

  constructor(
    private dialogRef: MatDialogRef<AddColumnsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; type: string,value:string },
    private fb: FormBuilder
  ) {
    this.columnForm = this.fb.group({
      columnName: ['', Validators.required],
      dataType: ['', Validators.required],
      value:['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    
    console.log('Form Values:', this.columnForm.value);

  
    this.dialogRef.close(this.columnForm.value);
  }
}
