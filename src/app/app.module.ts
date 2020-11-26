import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FilmListComponent } from './film-list/film-list.component';
import { SigleFilmComponent } from './film-list/sigle-film/sigle-film.component';
import { FilmFormComponent } from './film-list/film-form/film-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { FilmsService } from './services/films.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
    {path: 'auth/signup', component: SignupComponent},
    {path: 'auth/signin', component: SigninComponent},
    {path: 'films', canActivate: [AuthGuardService] , component: FilmListComponent},
    {path: 'films/new', canActivate: [AuthGuardService] , component: FilmFormComponent},
    {path: 'films/view/:id', canActivate: [AuthGuardService] , component: SigleFilmComponent},
    {path: '', redirectTo: 'films', pathMatch: 'full'},
    {path: '**', redirectTo: 'fims' }
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    FilmListComponent,
    SigleFilmComponent,
    FilmFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    FilmsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
