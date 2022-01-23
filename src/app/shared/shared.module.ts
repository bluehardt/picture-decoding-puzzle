import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { GridCellComponent } from './grid/grid-cell/grid-cell.component';
import { FormsModule } from '@angular/forms';
import { GridLegendComponent } from './grid/grid-legend/grid-legend.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorPickerCellComponent } from './color-picker/color-picker-cell/color-picker-cell.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GridComponent,
    GridCellComponent,
    GridLegendComponent,
    ColorPickerComponent,
    ColorPickerCellComponent,
  ],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    GridComponent,
    GridCellComponent,
    GridLegendComponent,
    ColorPickerComponent,
    ColorPickerCellComponent,
  ],
})
export class SharedModule {}
