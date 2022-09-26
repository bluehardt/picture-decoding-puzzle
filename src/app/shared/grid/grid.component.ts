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

  grid: any[][];

  filename = ''; // filename for saving

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

  copyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.gridData, undefined, 2));
  }

  saveAsFile() {
    const originalData = {
      members: [
        {
          name: 'cliff',
          age: '34',
        },
        {
          name: 'ted',
          age: '42',
        },
        {
          name: 'bob',
          age: '12',
        },
      ],
    };

    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(this.gridData, null, 2)], {
        type: 'application/json',
      })
    );
    a.setAttribute(
      'download',
      `${this.gridWidth}_${this.gridHeight}_${this.filename}.json`
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
