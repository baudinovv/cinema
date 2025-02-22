import Movie from './Movie';

export default interface Recommendations {
  page: Number;
  results: Movie[]
  total_pages: Number;
  total_results: Number;
}