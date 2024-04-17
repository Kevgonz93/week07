export type RockSong = {
  id: string;
  name: string;
  artist: string;
  album: string;
};

export type RockSongCreateDto = {
  name: string;
  artist: string;
  album?: string;
};
