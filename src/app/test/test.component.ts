import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { ImagesEnum } from '../_enums';
import { DbService } from '../_services/db.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  filename: string = null;

  file$;
  gridWidth = 24;
  gridHeight = 16;

  db$ = this.db.getPuzzles().pipe(
    retryWhen((errors) =>
      errors.pipe(
        delay(5000),
        mergeMap((error) => {
          let counter = 5;
          return counter-- > 0 ? of(error) : throwError(':/');
        })
      )
    ),
    map((res) => {
      res.data.puzzles.sort((a, b) => a.label.localeCompare(b.label));
      return res;
    })
  );

  constructor(private http: HttpClient, public db: DbService) {}

  ngOnInit(): void {
    // this.filename = ImagesEnum.Backpack;

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
