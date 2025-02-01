export default interface MovieVideo {
  id: Number,
  results: {
    iso_639_1: String;
    iso_3166_1: String;
    name: String;
    key: String;
    site: String;
    size: Number;
    type: String;
    official: Boolean;
    published_at: String;
    id: String;
  }[]
}