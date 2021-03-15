export type UserRole = "private" | "business" | "admin";

export type LatLng = {
  lng: number;
  lat: number;
};

export type ID = string;

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
  currentUser?: string;
  users: User[];
  listings: Listing[];
  categories: Category[];
  advertisements: Advertisement[];
  status?: any;
  error?: any;
};

export type DispatchAction =
  | "SET_STATE"
  | "ADD_USER"
  | "SET_CURRENT_USER"
  | "SET_LISTINGS"
  | "ADD_LISTING"
  | "REMOVE_LISTING"
  | "ADD_CATEGORY"
  | "ADD_ADVERTISEMENT"
  | "REMOVE_ADVERTISEMENT"
  | "SET_ERROR";

export type DispatchObject = {
  type: DispatchAction;
  payload: any;
};
