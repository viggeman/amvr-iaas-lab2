export interface User {
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  date_of_birth: string;
  address: string;
}

export interface Address {
  uid: string;
  country: string;
  city: string;
  street: string;
  street_number: number;
  postal_code: number;
}
