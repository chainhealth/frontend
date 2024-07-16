/**
 * Search Component
 * 
 * A simple search component that captures a search term from the user and emits 
 * an event when the search is initiated. It allows other components to respond
 *  to the search action by providing the entered term.
*/

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
