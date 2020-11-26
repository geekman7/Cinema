import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/models/Film.model';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-sigle-film',
  templateUrl: './sigle-film.component.html',
  styleUrls: ['./sigle-film.component.css']
})
export class SigleFilmComponent implements OnInit {

  film: Film;
  

  constructor(private route: ActivatedRoute,
              private filmService: FilmsService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.film = new Film('', []);
    const id = this.route.snapshot.params.id;
    this.filmService.getSigleFilm(+id)
        .then(
           (film: Film) => {
             this.film = film;
           }
        );
  }

  onBack() {
    this.router.navigate(['/films']);
  }

}
