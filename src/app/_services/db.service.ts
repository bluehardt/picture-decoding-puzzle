import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface DbPuzzlesModel {
  data: {
    puzzles: PuzzleModel[];
  };
}

export interface PuzzleModel {
  _id?: string;
  label: string;
  width: string;
  height: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private apiUrl =
    'https://realm.mongodb.com/api/client/v2.0/app/data-faytr/graphql';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPuzzles(): Observable<DbPuzzlesModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http.post<DbPuzzlesModel>(
      this.apiUrl,
      { query: '{puzzles {_id content height label width}}', variables: {} },
      { headers }
    );
  }

  postPuzzle(puzzle: PuzzleModel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.http.post(
      this.apiUrl,
      {
        query: `mutation ($data: PuzzleInsertInput!) { 
                insertOnePuzzle(data: $data)
                {
                  __typename
                  _id
                  content
                  height
                  label
                  width
                }
              }`,
        variables: {
          data: {
            label: puzzle.label,
            height: puzzle.height,
            width: puzzle.width,
            content: puzzle.content,
          },
        },
      },
      { headers }
    );
  }

  //project id: 633948eac665311cc312d100
}
