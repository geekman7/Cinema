import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { title } from 'process';
import { Film } from 'src/app/models/Film.model';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

  filmForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private filmService: FilmsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  // tslint:disable-next-line: typedef
  initForm() {
    this.filmForm = this.formBuilder.group({
      title: ['', Validators.required],
      realisateurs: this.formBuilder.array([])
    });
  }

  // tslint:disable-next-line: typedef
  onSaveFilm() {
    // tslint:disable-next-line: no-shadowed-variable
    const formValue = this.filmForm.value;
    const newFilm = new Film(formValue.title, formValue.realisateurs);
    if (this.fileUrl && this.fileUrl !== ''){
      newFilm.photo = this.fileUrl;
    }
    this.filmService.insertNewFilm(newFilm);
    this.router.navigate(['/films']);
  }

  // tslint:disable-next-line: typedef
  getRealisateur(){
    return this.filmForm.get('realisateurs') as FormArray ;
  }

  // tslint:disable-next-line: typedef
  onAddRealisateur(){
    const newRealisateurControl = this.formBuilder.control('', Validators.required);
    this.getRealisateur().push(newRealisateurControl);
  }

  // tslint:disable-next-line: typedef
  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.filmService.uploadFile(file)
                    .then(
                      (url: string) => {
                        this.fileUrl = url;
                        this.fileIsUploading = false;
                        this.fileUploaded = true;
                      }
                    );
  }

  // tslint:disable-next-line: typedef
  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
