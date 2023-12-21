import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { AddColumnsComponent } from '../add-columns/add-columns.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  NumberOfEntity: number = 0;
  ListOfColums: any[] = [];
  NumberOfRowInEntity: number[] = [0];
  Data: any[] = [[]];
  GrandTotal: any[] = [];
  Total: any[] = [];

  constructor(public dialog: MatDialog, private columnService: DashboardService) {}

  ngOnInit(): void {}

  AddEntity() {
    this.NumberOfEntity++;
   
    
     
    if (this.NumberOfEntity === 1) {
      this.GrandTotal = this.ListOfColums;
      this.Total = [this.ListOfColums.map(col => ({value: 0,columnName:col.columnName }))];
    }
    else
    {
      const newRow = this.ListOfColums.map(col => ({ value: 0,columnName:col.columnName }));
      
      this.Total.push(newRow);
    }
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddColumnsComponent, {
      width: '250px',
      data: { name: '', type: '' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log("i am result", result);
        this.ListOfColums.push(result);
        this.columnService.addColumn(`${result.name} (${result.type} ${result.value})`);
        this.GrandTotal = this.ListOfColums;
        console.log(this.ListOfColums);
      }
    });
  }

  getNumberRange(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }

  AddRow(rowId: any) {
    console.log("row", rowId);
    if (!isNaN(this.NumberOfRowInEntity[rowId])) {
      this.NumberOfRowInEntity[rowId]++;
      // Create a new array for each row
      const newRow = this.ListOfColums.map(col => ({ value: '' }));
      this.Data[rowId].push(newRow);
    } else {
      this.NumberOfRowInEntity[rowId] = 1;
      // Create a new array for the first row
      this.Data[rowId] = [this.ListOfColums.map(col => ({ value: '' }))];
    }
  
    console.log("Data", this.Data);
    console.log(this.NumberOfRowInEntity);
  }
  
  SaveData() {
    console.log(this.Data);
    console.log(this.GrandTotal);
    console.log(this.Total);
  }

  onDataChange(newValue: any, entityIndex: number, rowIndex: number, colIndex: number): void {
    if (!this.Data[entityIndex]) {
      this.Data[entityIndex] = [];
    }
    if (!this.Data[entityIndex][rowIndex]) {
      this.Data[entityIndex][rowIndex] = [];
    }
    if (!this.Data[entityIndex][rowIndex][colIndex]) {
      this.Data[entityIndex][rowIndex][colIndex] = {};
    }
    
    this.Data[entityIndex][rowIndex][colIndex].value = newValue;
    this.onDataChangeReflectChangeToTotal(0, entityIndex, -1, colIndex);
  }

  onDataChangeReflectChangeToTotal(newValue: any, entityIndex: number, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
        let sum = 0;
        for (let i = 0; i < this.NumberOfRowInEntity[entityIndex]; i++) {
          sum += Number(this.Data[entityIndex][i][colIndex].value);

        }
        this.Total[entityIndex][colIndex].value = sum;
        this.onTotalChangeGrandChange(0, -1, colIndex)
    } else {
        // This is a regular data row
        if (!this.Data[entityIndex]) {
            this.Data[entityIndex] = [];
        }
        if (!this.Data[entityIndex][rowIndex]) {
            this.Data[entityIndex][rowIndex] = [];
        }
        if (!this.Data[entityIndex][rowIndex][colIndex]) {
            this.Data[entityIndex][rowIndex][colIndex] = {};
        }

        this.Data[entityIndex][rowIndex][colIndex].value = newValue;
    }
}

  onTotalChange(newValue: any, entityIndex: number, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
      // This is the Total row
      this.Total[entityIndex][colIndex].value = newValue;
      this.onTotalChangeGrandChange(0, -1, colIndex)
    } else {
      // This is a regular data row
      if (!this.Data[entityIndex]) {
        this.Data[entityIndex] = [];
      }
      if (!this.Data[entityIndex][rowIndex]) {
        this.Data[entityIndex][rowIndex] = [];
      }
      if (!this.Data[entityIndex][rowIndex][colIndex]) {
        this.Data[entityIndex][rowIndex][colIndex] = {};
      }

      this.Data[entityIndex][rowIndex][colIndex].value = newValue;
    }
  }

  onGrandChange(newValue: any, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
    
      this.GrandTotal[colIndex].value = newValue;
    }
  }

  onTotalChangeGrandChange(newValue: any, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
        let sum = 0;
        for (let i = 0; i < this.NumberOfEntity; i++) {
            sum += Number(this.Total[i][colIndex].value);
        }
        this.GrandTotal[colIndex].value = sum;
    }
}

  getGrandTotalValue(index: number): any {
    return this.GrandTotal[index]?.value;
  }
}
