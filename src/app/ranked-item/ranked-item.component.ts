import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IApiResTvItem} from '../rank-list/rank-list.component';

@Component({
  selector: 'app-ranked-item',
  templateUrl: './ranked-item.component.html',
  styleUrls: ['./ranked-item.component.scss']
})
export class RankedItemComponent implements OnInit {

  @Output() favoriteEvent = new EventEmitter()

  @Input() item: IApiResTvItem;
  @Input() rank;
  @Input() favorite;

  firstAirDate;

  constructor() {
  }

  ngOnInit() {
    this.firstAirDate = new Date(this.item.first_air_date);
  }

  addToFavorites(event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteEvent.emit(this.item);
  }
}
