import { defineStore } from "pinia";

import MovieDetails from '../interfaces/MovieDetails';

export const useMovieDetails = defineStore(('movieDetails'), {
  state: () => {
    return { details :  {} as MovieDetails}
  },
  actions : {
    setDetails(arg : MovieDetails) : void {
      this.details = arg;
    }
  }
});