import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ImagesEnum } from '../_enums';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  filename: string = null;

  file$;
  gridWidth = 16;
  gridHeight = 16;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.filename = ImagesEnum.Mario;

    if (this.filename) {
      const filenameSplit = this.filename.split('_');
      this.gridWidth = Number(filenameSplit[0]);
      this.gridHeight = Number(filenameSplit[1]);
      this.file$ = this.getJSON(this.filename);
    }
  }

  getJSON(filename: string): Observable<any> {
    return this.http.get(`./assets/examples/${filename}.json`).pipe(
      tap((res) => {
        console.log(filename, res);
      })
    );
  }
}
