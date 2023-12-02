import {Component, inject} from '@angular/core';
import {TeaSearchService} from "../../services/tea-search.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';

  private teaSearchService = inject(TeaSearchService);

  searchTeaProducts(): void {
    this.teaSearchService.setSearchQuery(this.searchQuery);
    this.teaSearchService.loadTeaProducts();
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.teaSearchService.resetSearch();
  }
}
