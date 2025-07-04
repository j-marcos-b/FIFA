import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSource = new BehaviorSubject<any>({});
  currentFilter = this.filterSource.asObservable();

  private downloadCsvSource = new Subject<void>();
  downloadCsv$ = this.downloadCsvSource.asObservable();

  constructor() {}

  changeFilter(filter: any) {
    this.filterSource.next(filter);
  }

  triggerDownloadCsv() {
    this.downloadCsvSource.next();
  }
}
