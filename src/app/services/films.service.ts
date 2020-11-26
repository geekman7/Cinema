import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Film } from '../models/Film.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  films: Film[] = [];
  filmsSubject = new Subject<Film[]>();

  constructor() { }

  // tslint:disable-next-line: typedef
  emitFilms() {
    this.filmsSubject.next(this.films.slice());
  }

  // tslint:disable-next-line: typedef
  saveFilms(){
    firebase.database().ref('/films').set(this.films);
  }

  // tslint:disable-next-line: typedef
  getFilms() {
    firebase.database().ref('/films')
    .on('value', (data) => {
        this.films = data.val() ? data.val() : [];
        this.emitFilms();
    });
  }

  // tslint:disable-next-line: typedef
  getSigleFilm(id: number) {
    return new Promise(
        (resolve, reject) => {
          firebase.database().ref('/films/' + id).once('value')
          .then(
             (data) => {
               resolve(data.val());
             },
             (error) => {
                reject(error);
             }
          );
        }
    );
  }

  insertNewFilm(newFilm: Film){
      this.films.push(newFilm);
      this.saveFilms();
      this.emitFilms();
  }

  removeFilm(film: Film){
    const filmIndex = this.films.findIndex(
      (filmEl) => {
        if (filmEl === film){
            return true;
        }
      }
    );

    this.films.splice(filmIndex, 1);
    this.saveFilms();
    this.emitFilms();
  }

  uploadFile(file: File){
    return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
          .child('/images/' + almostUniqueFileName + file.name)
          .put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {

            },
            (error) => {
                reject();
            },
            () => {
                resolve(upload.snapshot.downloadURL);
            },
          );
        }
    );
  }

}
