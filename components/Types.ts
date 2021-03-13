export type UserRole = "private" | "business" | "admin";

export type LatLng = {
  lng: number;
  lat: number;
};

export type UserEntity = {
  id: string;
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
  location: LatLng;
};
