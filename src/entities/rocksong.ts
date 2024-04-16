export type RockSong = {
  id: string;
  name: string;
  artist: string;
  album: string;
  year: number;
};

export type RockSongCreateDto = {
  name: string;
  artist: string;
  album: string;
  year: number;
};
