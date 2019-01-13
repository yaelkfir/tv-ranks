import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

export interface IApiResList {
    page: number;
    results: any[];
    total_pages: number;
    total_results: number;
}

export interface IApiResTvItem {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    _rank?: number;
}

@Component({
    selector: 'app-rank-list',
    templateUrl: './rank-list.component.html',
    styleUrls: ['./rank-list.component.scss']
})
export class RankListComponent implements OnInit {

    list;
    favorites = '';
    api = 'http://localhost:3000/favorites';

    public swiper: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        observer: true,
        updateOnImagesReady: true,
        keyboard: true,
        mousewheel: false,
        scrollbar: false,
        initialSlide: 0,
        loop: true,
        preloadImages: true,
        watchOverflow: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.next-slide',
            prevEl: '.prev-slide',
        },
    };

    constructor(private client: HttpClient) {
    }

    ngOnInit() {

        this.getFavorites();

        this.client.get(`${environment.baseApi}/discover/tv`, {
            params: {
                with_genres: String(16),
                sort_by: 'vote_count.desc',
            }
        }).pipe(map((res: IApiResList) => res.results.sort(this.sortByVoteAverage)))
            .subscribe((res: IApiResTvItem[]) => {
                this.list = res;
            });
    }

    getFavorites() {
        this.client.get(this.api)
            .subscribe((r: IApiResTvItem[]) => {
                this.favorites = r.map((it) => it.id).join();
            });
    }

    sortByVoteAverage = (a, b) => {
        return b.vote_average - a.vote_average;
    };

    uponFavoritesEvent(item, rank) {
        const sub = !this.favorites.includes(item.id)
            ? this.client.post(this.api, JSON.stringify(Object.assign({_rank: rank}, item)))
            : this.client.delete(`${this.api}/${item.id}`);

        sub.subscribe(() => {
            this.getFavorites();
        });
    }
}
