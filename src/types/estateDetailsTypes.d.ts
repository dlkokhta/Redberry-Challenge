interface City {
  id: number;
  name: string;
  region_id: number;
  region: {
    id: number;
    name: string;
  };
}

interface Agent {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  phone: string;
}

interface EstateDetails {
  id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string;
  city: City;
  agent: Agent;
}
