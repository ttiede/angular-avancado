import { BaseResourceModel } from "../models/base-resource.model";

import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";


export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }


  getAll(): Observable<Array<T>> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  protected handleError(handleError: any): Observable<any> {
    console.log("Erro na requisiçáo =>", handleError);
    return throwError(handleError);
  }

  protected jsonDataToResources(jsondata: any[]): Array<T> {
    const resources: Array<T> = new Array<T>();
    jsondata.forEach(element => {
      resources.push(element as T)
    });

    return resources;
  }

  protected jsonDataToResource(jsondata: any): T {
    const resource = jsondata as T;
    return resource;

  }

}
