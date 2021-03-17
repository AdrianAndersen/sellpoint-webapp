export type UserRole = "private" | "business" | "admin";

export type LatLng = {
  lng: number;
  lat: number;
};

export type ID = number;

export type User = {
  id: ID;
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
  location: LatLng;
};

export type Listing = {
  id: ID;
  title: string;
  imageURL: string;
  description: string;
  price: number;
  categories: Category[];
  owner: ID;
};

export type Category = string;

export type Advertisement = {
  id: ID;
  title: string;
  imageURL: string;
  link: string;
  owner: ID;
};

export type GlobalState = {
  currentUser?: ID;
  usingDB: boolean;
  users: User[];
  listings: Listing[];
  categories: Category[];
  advertisements: Advertisement[];
};

export type DispatchAction =
  | "SET_STATE"
  | "ADD_USER"
  | "REMOVE_USER"
  | "SET_CURRENT_USER"
  | "SET_LISTINGS"
  | "ADD_LISTING"
  | "REMOVE_LISTING"
  | "ADD_CATEGORY"
  | "ADD_ADVERTISEMENT"
  | "REMOVE_ADVERTISEMENT";

export type DispatchObject = {
  type: DispatchAction;
  payload: any;
};
