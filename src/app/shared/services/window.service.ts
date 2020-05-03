import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  width: number;
  height: number;
  constructor() { }
}
