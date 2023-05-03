
export interface Country {
  id: string;
  country: string;
  cities: City[];
}

export interface City {
  id: string;
  city: string;
  zipCode: string;
}