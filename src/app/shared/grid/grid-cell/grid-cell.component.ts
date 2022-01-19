import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss'],
})
export class GridCellComponent implements OnInit {
  @Input() width: number = 50;
  @Input() height: number = 50;

  constructor() {}

  ngOnInit(): void {}
}
