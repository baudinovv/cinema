import { defineStore } from "pinia";

import MovieDetails from '../interfaces/MovieDetails';
import MovieVideo from "../interfaces/MovieVideo";
import Credits from "../interfaces/Credits";
import Recommendations from "../interfaces/Recommendations";
import Movie from "../interfaces/Movie";
import TV from "../interfaces/TV";
import { MovieImages } from "../interfaces/MovieImages";

export const useStoreDetails = defineStore(('details'), {
  state: () => {
    return {
      details :  {} as MovieDetails,
      credits : {} as Credits,
      language : "en-US" as String,
      director: "" as String,
      prodCompanies: [] as String[],
      recommendations: {} as Recommendations,
      videos: {} as MovieVideo,
      apiKey: import.meta.env.VITE_APP_API_KEY,
      headliner: {} as Movie,
      popularMovies: {} as Movie[],
      popularTV: {} as TV[],
      images: {} as MovieImages
    }
  },
  actions : {
    async getPopularMovies() {
      const url =
        `https://api.themoviedb.org/3/movie/now_playing?language=${this.language}&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: any) => {
        this.headliner = res.results[0];
        this.popularMovies = res.results;
        console.log("headliner: ",res)
        console.log("popularMovies: ", res);
      }).catch((err: Error) => console.error(err));
    },

    async getTV() {
      const url = `https://api.themoviedb.org/3/tv/on_the_air?language=${this.language}&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjAyNWE1YTk0MjAzYjE3NDFmNjU4ZmJmZGJjYTBiZCIsIm5iZiI6MTcyNTYyNTQ0OS4yMjUsInN1YiI6IjY2ZGFmNDY5N2VjOTkzNWRhNzcwNDEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xI5ygeAzdXqKb0H__kau5a6xJNVtkdHC8axMm04ZMa4'
        }
      };

      let responseTV = await fetch(url, options);
      let result = responseTV.json();
      result.then((res: any) => {
        this.popularTV = res.results;
        console.log("popularTV: ", res);
      }).catch((err: Error) => console.error(err));
    },

    async getHeadliner(id: Number | string) {
      const url =
      `https://api.themoviedb.org/3/movie/${id}?language=${this.language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: any) => {
        console.log("headliner :", res); //debug
        this.details = res; // set into pinia's store
      }).catch((err: Error) => console.error(err));
    },
    async getRecommendations(id : Number | string) {
      const url =
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=${this.language}&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: Recommendations) => {
        this.recommendations = res;
        console.log(res);
      }).catch((err: Error) => console.error(err));
    },
    async getCredits(id : Number | string) {
      const url =
      `https://api.themoviedb.org/3/movie/${id}/credits?language=${this.language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: Credits) => {
        this.credits = res;
        console.log(res);
        for(let item of res.crew){
          if(item.job == "Director"){
            this.director = item.name;
          }
        }
      }).catch((err: Error) => console.error(err));
    },

    getProdCompanies(){
      if(this.details.production_companies){
        this.prodCompanies = [];
        for(let item of this.details.production_companies){
          this.prodCompanies.push(item.name);
        }
      } 
    },
    async getVideos(id : Number) {
      const url =
      `https://api.themoviedb.org/3/movie/${id}/videos?language=${this.language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: MovieVideo) => {
        this.videos = res;
        console.log("video: ",res);
      }).catch((err: Error) => console.error(err));
    },
    async getImages(id: Number){
      const url =
      `https://api.themoviedb.org/3/movie/${id}/images?language=${this.language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer " + this.apiKey,
        },
      };
      let responseMovie = await fetch(url, options);
      let result = responseMovie.json();
      result.then((res: MovieVideo) => {
        this.videos = res;
        console.log("video: ",res);
      }).catch((err: Error) => console.error(err));
    }
  }
});