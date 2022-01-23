import { Component, Input, OnInit } from '@angular/core';
import {
  ColorPickerService,
  ColorsEnum,
} from 'src/app/_services/color-picker.service';

@Component({
  selector: 'app-color-picker-cell',
  templateUrl: './color-picker-cell.component.html',
  styleUrls: ['./color-picker-cell.component.scss'],
})
export class ColorPickerCellComponent implements OnInit {
  @Input() width: number = 50;
  @Input() height: number = 50;
  @Input() color: ColorsEnum;

  constructor(public colorPickerService: ColorPickerService) {}

  ngOnInit(): void {}

  setColor() {
    this.colorPickerService.setCurrentColor(this.color);
  }
}
