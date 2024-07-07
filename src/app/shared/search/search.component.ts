import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchTerm: string = '';

  constructor() { }

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
