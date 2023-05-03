interface Country {
  id: string;
  country: string;
  cities: City[];
}

interface City {
  id: string;
  city: string;
  zipCode: string;
}