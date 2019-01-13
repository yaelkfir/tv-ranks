import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IApiResTvItem} from '../rank-list/rank-list.component';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

  favorites;
  list;
  firstAirDate;
  api = 'http://localhost:3000/favorites';


  constructor(private client: HttpClient) {
  }

    ngOnInit() {
        this.getFavorites();
    }

    getFavorites() {
    this.client.get(this.api).subscribe((r: IApiResTvItem[]) => {
      this.favorites = r;
    });
  }

  removeFavorite(item) {
    this.client.delete(`this.api/${item.id}`).subscribe(() => {
      this.getFavorites();
    });
  }

}
