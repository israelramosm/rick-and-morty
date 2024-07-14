export default interface RickAndMortyAPIResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Array<T>;
}
