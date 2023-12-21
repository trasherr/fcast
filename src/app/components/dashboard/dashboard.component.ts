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
  ListOfColumns: any[] = [];
  EntityTotal: any[] = [];
  NumberOfRowInEntity: any[] = [[]];
  Data: any[] = [[[]]];
  GrandTotal: any[] = [];
  Total: any[] = [];

  constructor(public dialog: MatDialog, private columnService: DashboardService) {}

  ngOnInit(): void {}

  AddEntity() {
    this.NumberOfEntity++;

    if (this.NumberOfEntity === 1) {
      this.GrandTotal = this.ListOfColumns;
      this.EntityTotal = [this.ListOfColumns.map(col => ({ value: 0, columnName: col.columnName }))];
    } else {
      const newRow = this.ListOfColumns.map(col => ({ value: 0, columnName: col.columnName }));
      this.EntityTotal.push(newRow);
    }

    this.NumberOfRowInEntity[this.NumberOfEntity - 1] = [];
  }

  AddTable(EntityIndex: any) {
    console.log(EntityIndex);
    this.NumberOfRowInEntity[EntityIndex].push(0);
    console.log("es", this.NumberOfRowInEntity);
  
    if (this.Total[EntityIndex] === undefined) {
      this.Total[EntityIndex] = [this.ListOfColumns.map(col => ({ value: 0, columnName: col.columnName }))];
    } else {
      const newRow = this.ListOfColumns.map(col => ({ value: 0, columnName: col.columnName }));
      this.Total[EntityIndex].push(newRow);
    }
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(AddColumnsComponent, {
      width: '50%',
      data: { name: '', type: '' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log("i am result", result);
        this.ListOfColumns.push(result);
        this.columnService.addColumn(`${result.name} (${result.type} ${result.value})`);
        this.GrandTotal = this.ListOfColumns;
        console.log(this.ListOfColumns);
      }
    });
  }

  getNumberRange(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }

  AddRow(EntityId: any, TableIndex: number, rowId: any) {
    console.log("Number of row in entity", this.NumberOfRowInEntity);
    console.log("row", rowId, "TableIndex", TableIndex);

    if (!Array.isArray(this.NumberOfRowInEntity[EntityId])) {
      this.NumberOfRowInEntity[EntityId] = [];
    }

    if (this.NumberOfRowInEntity[EntityId][TableIndex] !== undefined) {
      this.NumberOfRowInEntity[EntityId][TableIndex]++;

      if (!Array.isArray(this.Data[EntityId])) {
        this.Data[EntityId] = [];
      }

      if (!Array.isArray(this.Data[EntityId][TableIndex])) {
        this.Data[EntityId][TableIndex] = [];
      }

      const newRow = this.ListOfColumns.map(col => ({ value: '' }));
      this.Data[EntityId][TableIndex].push(newRow);
    } else {
      this.NumberOfRowInEntity[EntityId][TableIndex] = 1;

      if (!Array.isArray(this.Data[EntityId])) {
        this.Data[EntityId] = [];
      }

      this.Data[EntityId][TableIndex] = [this.ListOfColumns.map(col => ({ value: '' }))];
    }

    console.log("Data", this.Data);
    console.log(this.NumberOfRowInEntity);
  }

  SaveData() {
    console.log(this.Data);
    console.log(this.GrandTotal);
    console.log("Total",this.Total);

    console.log("Entity Total", this.EntityTotal);
  }

  onTotalChangeToEntityTotal(newValue: any, entityIndex: number, colIndex: number): void {

    let sum = 0;
    for (let i = 0; i < this.Total[entityIndex].length; i++) {
      sum += Number(this.Total[entityIndex][i][colIndex].value);
    }
    this.EntityTotal[entityIndex][colIndex].value = sum;

    this.onTotalChangeGrandChange(0, 0, colIndex);
  }

  onEntityTotalChange(newValue: any, entityIndex: number, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
      this.EntityTotal[entityIndex][colIndex].value = newValue;
      this.onTotalChangeGrandChange(0, 0, colIndex);
    }
  }

  onDataChange(newValue: any, entityIndex: number, TableIndex: number, rowIndex: number, colIndex: number): void {
    if (!this.Data[entityIndex]) {
      this.Data[entityIndex] = [];
    }
    if (!this.Data[entityIndex][TableIndex][rowIndex]) {
      this.Data[entityIndex][TableIndex][rowIndex] = [];
    }
    if (!this.Data[entityIndex][TableIndex][rowIndex][colIndex]) {
      this.Data[entityIndex][TableIndex][rowIndex][colIndex] = {};
    }
    this.Data[entityIndex][TableIndex][rowIndex][colIndex].value = newValue;
    this.onDataChangeReflectChangeToTotal(0, entityIndex, TableIndex, -1, colIndex);
  }

  onDataChangeReflectChangeToTotal(newValue: any, entityIndex: number, TableIndex: number, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
      let sum = 0;
      for (let i = 0; i < this.NumberOfRowInEntity[entityIndex][TableIndex]; i++) {
        sum += Number(this.Data[entityIndex][TableIndex][i][colIndex].value);
      }
      this.Total[entityIndex][TableIndex][colIndex].value = sum;
      this.onTotalChangeToEntityTotal(0, entityIndex, colIndex);
    } else {
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

  onTotalChange(newValue: any, entityIndex: number, TableIndex: number, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
      this.Total[entityIndex][TableIndex][colIndex]['value'] = newValue;
      this.onTotalChangeToEntityTotal(0, entityIndex, colIndex);
    } else {
      if (!this.Data[entityIndex]) {
        this.Data[entityIndex][TableIndex] = [];
      }
      if (!this.Data[entityIndex][TableIndex][rowIndex]) {
        this.Data[entityIndex][TableIndex][rowIndex] = [];
      }
      if (!this.Data[entityIndex][TableIndex][rowIndex][colIndex]) {
        this.Data[entityIndex][TableIndex][rowIndex][colIndex] = {};
      }
      this.Data[entityIndex][TableIndex][rowIndex][colIndex].value = newValue;
      this.onTotalChangeToEntityTotal(0,entityIndex,colIndex);
    }
  }

  onGrandChange(newValue: any, rowIndex: number, colIndex: number): void {
    if (rowIndex === -1) {
      this.GrandTotal[colIndex].value = newValue;
    }
  }

  onTotalChangeGrandChange(newValue: any, rowIndex: number, colIndex: number): void {
   
      let sum = 0;
      for (let i = 0; i < this.EntityTotal.length; i++) {
        console.log("yes");
        sum += Number(this.EntityTotal[i][colIndex].value);
      }
      this.GrandTotal[colIndex].value = sum;
    
  }

  getGrandTotalValue(index: number): any {
    return this.GrandTotal[index]?.value;
  }
}
