export default interface Credits {
  id: Number;
  cast: {
    adult: Boolean;
    gender: Number;
    id: Number;
    known_for_department: String;
    name: String;
    original_name: String;
    popularity: Number;
    profile_path: String;
    cast_id: Number;
    character: String;
    credit_id: String;
    order: Number;
  }[],
  crew: {
    adult: Boolean;
    gender: Number;
    id: Number;
    job: String;
    known_for_department: String;
    name: String;
    original_name: String;
    popularity: Number;
    profile_path: String;
    cast_id: Number;
    character: String;
    credit_id: String;
    order: Number;
  }[]
};
