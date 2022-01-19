import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { GridCellComponent } from './grid/grid-cell/grid-cell.component';
import { FormsModule } from '@angular/forms';
import { GridLegendComponent } from './grid/grid-legend/grid-legend.component';

@NgModule({
  declarations: [GridComponent, GridCellComponent, GridLegendComponent],
  imports: [CommonModule, FormsModule],
  exports: [GridComponent, GridCellComponent, GridLegendComponent],
})
export class SharedModule {}
