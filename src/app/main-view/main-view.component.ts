import { Component, OnInit } from '@angular/core';
import {WebApiService} from './../services/web-api.service';
import {Movie} from './../common/movie';
//import sweet alerts, very beautiful alerts to represent messages , errors etc
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  //In this array we store all the movies
  movies : Movie[] = new Array<Movie>();

  //initiate WebApiService
  constructor(public _webApiService:WebApiService) { }
  //Get movies from our webApiService
  ngOnInit() {
    this._webApiService.ajaxGetMovies();
    this.movies=this._webApiService.movies;
  }

  //function to delete movie. It will ask if you are sure you wanna delete movie
  deleteMovie(index){
    Swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.movies.splice(index,1);
        Swal(
          'Deleted!',
          'Your movie has been deleted.',
          'success'
        )
      }
    })
  }
  

  //Those are parameters are needed in order to edit and add new movies
  storedIndex:number; //param to store index of the movie that we are editing
  storedMovie : Movie = new Movie(null,null,null,null,null,null,null); //member to store the data of the movie we are going to add
  movieTitle:string='';
  movieYear:Date=null;
  movieRuntime:string='';
  movieGenre:string='';
  moviePoster:string='';
  movieDirector:string='';


   //Function prepares params of the movie that we are editing
  openEditModal(index){
    this.storedIndex=index;
    this.storedMovie=this.movies[index];
    this.movieTitle=this.storedMovie.Title;
    this.movieDirector=this.storedMovie.Director;
    this.movieYear=this.storedMovie.Year;
    this.movieRuntime=this.storedMovie.Runtime;
    this.movieGenre=this.storedMovie.Genre;
    this.moviePoster=this.storedMovie.Poster;
  }



  
  duplicateTitle :boolean;
  //Function to save edting changes 
  saveEditChanges(){
    this.duplicateTitle=false;
    let webMovie:Movie = new Movie(null,null,null,null,null,null,null);  
    this._webApiService.ajaxCheckTitleName(this.movieTitle).subscribe((resp)=>{
      webMovie=resp.json();
      //check if the movie-title we edit is not the same movie we are editing
      if(this.movies[this.storedIndex].Title!=this.movieTitle){
       //check if the movie title already exists on the web (api)
          if(webMovie.Title){
            Swal({
              type: 'error',
              title: 'That title already exist on the internet!',
              text: 'Create another title',
            })
            this.duplicateTitle=true;
          }
        //check if the movie title already exists on our website
          this.movies.forEach(element => {
            if(element.Title.toLowerCase()===this.movieTitle.toLowerCase()){
              Swal({
                type: 'error',
                title: 'That title already taken!',
                text: 'Create another title',
              })
              this.duplicateTitle=true;
            }
          });
      }
      //check if all req fields are filled
    if(this.movieDirector==='' || this.movieGenre==='' || this.movieRuntime==='' || this.movieTitle==='' || this.movieYear===null){
      Swal({
        type: 'error',
        title: 'Error',
        text: 'One of the following :Director, Genre, Runtime, Title or Year is missing',
      })
      this.duplicateTitle=true;
    }
    if(this.duplicateTitle===false){
      //at this point we know that everything is fineand we can edit the movie
    this.movies[this.storedIndex].Title=this.movieTitle;
    this.movies[this.storedIndex].Year=this.movieYear;
    this.movies[this.storedIndex].Runtime=this.movieRuntime;
    this.movies[this.storedIndex].Genre=this.movieGenre;
    this.movies[this.storedIndex].Director=this.movieDirector;
    this.movies[this.storedIndex].Poster=this.moviePoster;
    this.duplicateTitle=true;
    Swal("Good job!", "The movie was edited!", "success")
    }
  });
  }
  
  //Function prepares params we will need in order to add new movie
  addNewMovieOpenModal(){
    this.storedMovie= new Movie(null,null,null,null,null,null,null);
    this.storedIndex=null;
    this.movieDirector='';
    this.movieTitle='';
    this.movieYear=null;
    this.movieRuntime='';
    this.movieGenre='';
    this.moviePoster='';
  }
  
  autoId:number=1;
 //Function to add new movie
  addNewMovie(){
    this.duplicateTitle=false;
    let webMovie:Movie = new Movie(null,null,null,null,null,null,null);
    this._webApiService.ajaxCheckTitleName(this.movieTitle).subscribe((resp)=>{
      webMovie=resp.json();
      //check if the movie title already exists on the web (api)
      if(webMovie.Title){
        Swal({
          type: 'error',
          title: 'That title already exist on the internet!',
          text: 'Create another title',
        })
        this.duplicateTitle=true;
      }
     //check the movie title already exists on our website
       this.movies.forEach(element => {
      if(element.Title.toLowerCase()===this.movieTitle.toLowerCase()){
        Swal({
          type: 'error',
          title: 'That title already taken!',
          text: 'Create another title',
        })
        this.duplicateTitle=true;
      }
    });
       //check if all req fields are filled
    if(this.movieDirector==='' || this.movieGenre==='' || this.movieRuntime==='' || this.movieTitle==='' || this.movieYear===null){
      Swal({
        type: 'error',
        title: 'Error',
        text: 'One of the following :Director, Genre, Runtime, Title or Year is missing',
      })
      this.duplicateTitle=true;
    }
    if(this.duplicateTitle===false){ 
      //at this point we know that everything is fine and we can edit the movie
   this.storedMovie.Title=this.movieTitle;
   this.storedMovie.Genre=this.movieGenre;
   this.storedMovie.Poster=this.moviePoster;
   this.storedMovie.Director=this.movieDirector;
   this.storedMovie.Year=this.movieYear;
   this.storedMovie.Poster=this.moviePoster;   
   this.storedMovie.Runtime=this.movieRuntime+" min";
   this.storedMovie.Id=this.autoId;
   this.movies.push(this.storedMovie);
   this.autoId++;
   this.storedMovie= new Movie(null,null,null,null,null,null,null);
   Swal("Good job!", "The movie was added!", "success")
  }
    });
  }

  //Function resets the form when modal is closed
  closeModal(form:NgForm){
   form.reset();
  }
}
