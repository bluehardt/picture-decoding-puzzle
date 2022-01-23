import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorsEnum } from 'src/app/_enums';
import { GridCellModel } from 'src/app/_models';
import { ColorPickerService } from 'src/app/_services/color-picker.service';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss'],
})
export class GridCellComponent implements OnInit {
  @Input() width: number = 50;
  @Input() height: number = 50;
  @Input() gridCell: GridCellModel;
  @Output() colored: EventEmitter<GridCellModel> = new EventEmitter();

  constructor(public colorPickerService: ColorPickerService) {}

  ngOnInit(): void {}

  mousedown() {
    this.colorPickerService.setMouseDown(true);
    this.colorCell();
  }

  mouseup() {
    this.colorPickerService.setMouseDown(false);
  }

  mousemove() {
    if (this.colorPickerService.getMouseDown()) {
      this.colorCell();
    }
  }

  colorCell() {
    this.gridCell.color = this.colorPickerService.getCurrentColor();
    this.colored.emit(this.gridCell);
  }
}
