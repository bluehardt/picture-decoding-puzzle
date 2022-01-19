import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() sizeX: number = 10;
  @Input() sizeY: number = 10;

  // characters for the header row
  readonly alphabet = String.fromCharCode(...Array(123).keys())
    .slice(97)
    .toUpperCase();

  constructor() {}

  ngOnInit(): void {}

  // TODO: temporary
  increment(value: number) {
    const x = this.sizeX + value;
    const y = this.sizeY + value;

    if (x < 1) {
      this.sizeX = 1;
    } else if (x > 26) {
      this.sizeX = 26;
    } else {
      this.sizeX = x;
    }

    if (y < 1) {
      this.sizeY = 1;
    } else if (y > 26) {
      this.sizeY = 26;
    } else {
      this.sizeY = y;
    }
  }
}
