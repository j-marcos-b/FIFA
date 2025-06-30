import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModeService {
  private modeSubject = new BehaviorSubject<'login' | 'register'>('login');
  mode$ = this.modeSubject.asObservable();

  setMode(mode: 'login' | 'register'): void {
    this.modeSubject.next(mode);
  }
}
