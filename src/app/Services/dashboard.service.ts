import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private columnsSubject = new BehaviorSubject<string[]>([]);
  columns$: Observable<string[]> = this.columnsSubject.asObservable();

  addColumn(column: string): void {
    const columns = this.columnsSubject.value;
    columns.push(column);
    this.columnsSubject.next(columns);
  }
}
