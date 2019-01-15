import { Injectable } from '@angular/core';
import {Movie} from './../common/movie';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  tmpMovies : Movie[] = new Array<Movie>();
  movies : Movie[] = new Array<Movie>();
  //initiate Http
  constructor(private _http:Http) { }

  //this is member for search for movies in order to fill out application with bunch of movies from the api. In this example its "batman" 
  moviesSearch : string = "batman";

  ajaxGetMovies(){
    //search for movies from the api and store them into tmpMovies Array
      this._http.get('http://www.omdbapi.com/?apikey=ba68b739&s='+this.moviesSearch).subscribe((resp)=>{
        while(this.tmpMovies.length>0){
          this.tmpMovies.pop();
        }
        let list = resp.json();
        for (let item of list.Search){
          this.tmpMovies.push(item);
        }
        console.log(this.tmpMovies);
        //get full data from each of the movie we stored in the tmpMovies Array and put the data to the movies Array
        for(let movie of this.tmpMovies){
          this._http.get('http://www.omdbapi.com/?apikey=ba68b739&t='+movie.Title).subscribe((resp=>{
          console.log(resp)
          this.movies.push(resp.json())
      }))
        }
        console.log(this.movies)
      })
  }

    //This method return the movie by title from the api. *I use it in order to check if there is no movie with the same title that I add or edit on the internet (api)
  ajaxCheckTitleName(movieTitle:string){
   return this._http.get('http://www.omdbapi.com/?apikey=ba68b739&t='+movieTitle);
  }
}
