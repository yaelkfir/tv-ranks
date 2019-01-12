import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IApiResTvItem} from '../rank-list/rank-list.component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

  favorites;
  loading;
  list;
  firstAirDate;


  constructor(private client: HttpClient) {
  }

  getFavorites() {
    this.client.get('http://localhost:3000/favorites').subscribe((r: IApiResTvItem[]) => {
      this.favorites = r;
    });
  }

  ngOnInit() {
    this.getFavorites();
  }

  removeFavorite(item) {
    this.client.delete(`http://localhost:3000/favorites/${item.id}`).subscribe((res) => {
      this.getFavorites();
    });
  }

}
