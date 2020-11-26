import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from '../models/Film.model';
import { FilmsService } from '../services/films.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit, OnDestroy {

  films: Film[];
  filmsSubscription: Subscription;

  constructor(private filmService: FilmsService, private router: Router) { }

  ngOnInit(): void {
    this.filmsSubscription = this.filmService.filmsSubject.subscribe(
        (films: Film[]) => {
          this.films = films;
        }
    );
    
    this.filmService.getFilms();
    this.filmService.emitFilms();
  }

  // tslint:disable-next-line: typedef
  onNewFilm(){
    this.router.navigate(['/films', 'new'])
  }

  // tslint:disable-next-line: typedef
  onDeleteFilm(film: Film){
    this.filmService.removeFilm(film);
  }

  // tslint:disable-next-line: typedef
  onViewFilm(id: number){
    this.router.navigate(['/films', 'view', id]);
  }


  ngOnDestroy(){
    this.filmsSubscription.unsubscribe();
  }

}
