import { City, Country, State } from "./Location";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  address: string;
  address2: string;
  city: City;
  state: State;
  country: Country;
  timeRegistered: Date;
}
export type {User};