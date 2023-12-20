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

   NumberOfEntity:number=0;
   ListOfColums:any[]=[];
   NumberOfRowInEntity:number[]=[0];
   Data:any[]=[[]];
   GrandTotal:any[]=[];
   Total:any=[];

   constructor(public dialog: MatDialog, private columnService: DashboardService) {}

  ngOnInit(): void {
    
  }

  
  AddEntity()
  {
    this.NumberOfEntity++;

    this.Total.push(this.ListOfColums);
   if(this.NumberOfEntity===1)
    this.GrandTotal=this.ListOfColums;

    console.log("Total",this.Total);
    console.log("Grand",this.GrandTotal);

   
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddColumnsComponent, {
      width: '250px',
      data: { name: '', type: '' },
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        console.log("i am result",result);
        this.ListOfColums.push(result);
        this.columnService.addColumn(`${result.name} (${result.type} ${result.value})`);
        this.GrandTotal=this.ListOfColums;
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
    } else {
      this.NumberOfRowInEntity[rowId] = 1;
    }
  if(this.Data[rowId])
  this.Data[rowId].push(this.ListOfColums);
else
this.Data[rowId]=[this.ListOfColums];
  
    console.log("Data",this.Data);
    console.log(this.NumberOfRowInEntity);
  }
  

  SaveData()
  {
    console.log(this.Data);
    console.log(this.GrandTotal);
    console.log(this.Total);
  }
}
