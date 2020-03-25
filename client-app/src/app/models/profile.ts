export interface IProfile {
  displayName: string;
  username: string;
  bio: string;
  image: string;
  photos: Iphoto[];
}

export interface Iphoto {
  id: string;
  url: string;
  isMain: boolean;
}
