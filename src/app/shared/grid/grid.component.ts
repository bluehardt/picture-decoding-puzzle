import { Component, Input, OnInit } from '@angular/core';
import { ColorsEnum } from 'src/app/_enums';
import { GridCellModel } from 'src/app/_models';
import { ColorPickerService } from 'src/app/_services/color-picker.service';

// characters for the header row
export const alphabet = String.fromCharCode(...Array(123).keys())
  .slice(97)
  .toUpperCase();
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() gridWidth: number = 20;
  @Input() gridHeight: number = 10;
  @Input() gridData: GridCellModel[] = [];

  alphabet = alphabet;
  cellSize = 40;

  panelVisible = true;

  constructor(public colorPickerService: ColorPickerService) {}

  ngOnInit(): void {
    if (!this.gridData.length) {
      this.clearGrid();
    }
  }

  cellColored(event: GridCellModel) {
    this.gridData = [].concat(this.gridData);
  }

  clearGrid() {
    this.gridData = [];

    for (let i = 1; i <= this.gridHeight; i++) {
      for (let j = 1; j <= this.gridWidth; j++) {
        this.gridData.push({
          color: ColorsEnum.None,
          row: i,
          column: j,
        });
        // Object.values(ColorsEnum)[
        //   Math.round(Math.random() * Object.keys(ColorsEnum).length)
        // ];
      }
    }
  }

  // resets mousedown state when leaving the grid
  mouseleave() {
    this.colorPickerService.setMouseDown(false);
  }

  togglePanel() {
    this.panelVisible = !this.panelVisible;
    console.log(this.gridData);
  }

  // TODO: temporary
  increment(value: number) {
    const x = this.gridWidth + value;
    const y = this.gridHeight + value;

    if (x < 1) {
      this.gridWidth = 1;
    } else if (x > 26) {
      this.gridWidth = 26;
    } else {
      this.gridWidth = x;
    }

    if (y < 1) {
      this.gridHeight = 1;
    } else if (y > 26) {
      this.gridHeight = 26;
    } else {
      this.gridHeight = y;
    }
  }
}
