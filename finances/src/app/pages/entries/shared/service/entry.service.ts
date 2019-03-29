import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Entry } from "../model/entry.model";

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
  private apiPath: string = "api/entries";

  constructor (private http: HttpClient) { }

  getAll(): Observable<Array<Entry>>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<Entry>{
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  create(entry: Entry): Observable<Entry>{
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    );
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private handleError(handleError: any): Observable<any> {
    console.log("Erro na requisiçáo =>", handleError);
    return throwError(handleError);
  }

  private jsonDataToEntries(jsondata: any[]): Array<Entry> {
    const entries: Array<Entry> = new Array<Entry> ();
    jsondata.forEach(element => {
      const entry = Object.assign( new Entry(), element);
      entries.push(entry);
    });
    
    return entries;
  }

  private jsonDataToEntry(jsondata: any): Entry {
    const entry = Object.assign( new Entry(), jsondata);
    return entry;
  }  
}
