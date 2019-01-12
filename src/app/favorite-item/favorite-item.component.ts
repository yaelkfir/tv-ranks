import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IApiResTvItem} from '../rank-list/rank-list.component';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent implements OnInit {

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

  removeFavorite() {
    this.favoriteEvent.emit(this.item);
  }
}
