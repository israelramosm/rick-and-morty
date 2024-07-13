export type InfoPropsT = {
  name: string;
  image: string;
};

export type CharacterT = {
  id: string;
  location: string,
  episodes: Array<string>
} & InfoPropsT
