import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchQuery: string = '';
  @Output() searchQueryChange: EventEmitter<string> = new EventEmitter<string>(); // Create an EventEmitter for emitting search query changes

  onSearch() {
    this.searchQueryChange.emit(this.searchQuery); // Emit the search query when it changes
  }
}
