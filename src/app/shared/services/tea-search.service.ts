import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TeaProductType} from "../../../types/tea-product.type";
import {TeaProductService} from "./tea-product.service";

@Injectable({
  providedIn: 'root'
})
export class TeaSearchService {

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private teaProductsSubject: BehaviorSubject<TeaProductType[]> = new BehaviorSubject<TeaProductType[]>([]);
  public teaProducts$: Observable<TeaProductType[]> = this.teaProductsSubject.asObservable();

  private teaProductService = inject(TeaProductService);

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  resetSearch(): void {
    this.setSearchQuery('');
    this.loadTeaProducts();
  }

  loadTeaProducts(): void {
    const searchQuery: string = this.searchQuerySubject.value;
    console.log('Search Query:', searchQuery);

    if(searchQuery.trim()==='') {
      this.teaProductService.getTeaProducts(this.searchQuerySubject.value).subscribe(
        (data) => {
          this.teaProductsSubject.next(data);
        },
        (error) => {
          console.error('Ошибка загрузки товаров: ', error);
          this.teaProductsSubject.next([]); // Чтобы избежать пустой страницы
        }
      );
    } else {
      this.teaProductService.getTeaProducts(searchQuery).subscribe(
        (data) => {
          this.teaProductsSubject.next(data);
        },
        (error) => {
          console.error('Ошибка загрузки товаров по запросу: ', error);
          this.teaProductsSubject.next([]);
        }
      );
    }

  }
}
