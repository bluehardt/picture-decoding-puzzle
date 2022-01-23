import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ColorsEnum } from 'src/app/_enums';
import { GridCellModel } from 'src/app/_models';
import { alphabet } from '../grid.component';

@Component({
  selector: 'app-grid-legend',
  templateUrl: './grid-legend.component.html',
  styleUrls: ['./grid-legend.component.scss'],
})
export class GridLegendComponent implements OnInit, OnChanges {
  @Input() gridData: GridCellModel[];

  uniqueColors = [];
  uniqueColorsCells = {};

  alphabet = alphabet;
  colorsEnum = ColorsEnum;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // getting unique colors from grid
    this.uniqueColors = [
      ...new Set(
        this.gridData.map((el) => {
          return el.color;
        })
      ),
    ];

    // creating object with colors and cells they are in
    this.uniqueColorsCells = {};
    this.uniqueColors.forEach((color) => {
      this.uniqueColorsCells[color] = this.gridData.filter(
        (el) => el.color === color
      );
    });
  }
}
