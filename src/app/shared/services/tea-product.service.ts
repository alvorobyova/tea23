import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TeaProductType} from "../../../types/tea-product.type";

@Injectable({
  providedIn: 'root'
})
export class TeaProductService {
private http = inject(HttpClient);

  /*getTeaProducts(): Observable<TeaProductType[]> {
    return this.http.get<TeaProductType[]>('https://testologia.site/tea');
  }

  getTeaProduct(id: number): Observable<TeaProductType> {
    return this.http.get<TeaProductType>(`https://testologia.site/tea?id=${id}`);
  }*/

  getTeaProducts(searchQuery: string = ''): Observable<TeaProductType[]> {
    const url = searchQuery
      ? `https://testologia.site/tea?search=${encodeURIComponent(searchQuery)}`
      : 'https://testologia.site/tea';
    return this.http.get<TeaProductType[]>(url).pipe(
      catchError((error) => {
        console.log('Ошибка: ' + error);
        return of([]);
      })
    );
  }
  getTeaProduct(id: number): Observable<TeaProductType> {
    return this.http.get<TeaProductType>(`https://testologia.site/tea?id=${id}`);
  }

}
