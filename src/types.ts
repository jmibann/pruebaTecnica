declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}
export interface Result {
  info: Info;
  results: User[];
}

export interface Info {
  page: number;
  results: number;
  seed: string;
  version: string;
}

export interface User {
  id: ID;
  location: Location;
  name: Name;
  picture: Picture;
}

export interface ID {
  name: string;
  value: string;
}

export interface Location {
  city: string;
  coordinates: Coordinates;
  country: string;
  postcode: string;
  state: string;
  street: Street;
  timezone: Timezone;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Street {
  name: string;
  number: number;
}

export interface Timezone {
  description: string;
  offset: string;
}

export interface Name {
  first: string;
  last: string;
  title: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export type FiltersSettings = {
  sortByCountry: boolean;
  color: boolean;
  input: string | undefined;
}
