import { Injectable } from '@angular/core';
import { ColorsEnum } from '../_enums';
export { ColorsEnum };

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {
  private currentColor: ColorsEnum = ColorsEnum.Black;
  private mouseDown: boolean = false;

  constructor() {}

  getCurrentColor() {
    return this.currentColor;
  }

  setCurrentColor(color: ColorsEnum) {
    this.currentColor = color;
  }

  getMouseDown() {
    return this.mouseDown;
  }

  setMouseDown(value: boolean) {
    this.mouseDown = value;
  }
}
