import Movie from './Movie';
import TV from '../TV/TV';

export interface Recommendations {
  page: Number;
  results: Movie[] & TV[];
  total_pages: Number;
  total_results: Number;
}