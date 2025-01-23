import { defineStore } from "pinia";

import MovieDetails from '../interfaces/MovieDetails';
import Credits from "../interfaces/Credits";

export const useStoreDetails = defineStore(('details'), {
  state: () => {
    return {
      details :  {} as MovieDetails,
      credits : {} as Credits,
      language : "ru-RU" as String,
      director: "" as String,
      prodCompanies: [] as String[]
    }
  },
  actions : {
    setDetails(arg : MovieDetails) : void {
      this.details = arg;
    },
    setCredits(arg : Credits): void{
      this.credits = arg;
    },
    setLanguage(arg : String): void{
      this.language = arg;
    },
    setDirector(arg : String): void{
      this.director = arg;
    },
    setProdCompanies(arg : String[]): void{
      this.prodCompanies = arg;
    }
  }
});