export interface IProfile {
  displayName: string;
  username: string;
  bio: string;
  image: string;
  following: boolean;
  followersCount: number;
  followingCount: number;
  photos: Iphoto[];
}

export interface Iphoto {
  id: string;
  url: string;
  isMain: boolean;
}
