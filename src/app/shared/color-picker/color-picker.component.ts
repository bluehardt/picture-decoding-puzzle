import { Component, OnInit } from '@angular/core';
import { ColorsEnum } from 'src/app/_enums';
import { ColorPickerService } from 'src/app/_services/color-picker.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  readonly colors = Object.values(ColorsEnum);

  constructor(public colorPickerService: ColorPickerService) {}

  ngOnInit(): void {}
}
