import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";
const initialState = {
  currentUser: undefined,
  users: [
    {
      id: 1,
      name: "Ola Halvorsen",
      phoneNumber: "98765432",
      username: "ola",
      password: "ola",
      role: "private",
    },
    {
      id: 2,
      name: "Erna Soberg",
      phoneNumber: "12345677",
      username: "erna",
      password: "erna",
      role: "business",
    },
    {
      id: 3,
      name: "Admin Adminsen",
      phoneNumber: "1234567",
      username: "admin",
      password: "admin",
      role: "admin",
    },
  ],
  listings: [
    {
      id: 1,
      title: "My first listing",
      imageURL:
        "https://images.unsplash.com/photo-1612135945668-0c2190dfac07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      description: "My first description",
      price: "123",
      owner: 1,
    },
    {
      id: 2,
      title: "My second listing",
      imageURL:
        "https://images.unsplash.com/photo-1612174462937-171b1f2e7e68?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      description: "My second description",
      price: "321",
      owner: 3,
    },
  ],
  advertisements: [
    {
      id: 1,
      title: "Elkjøps nyttårssalg",
      imageURL: "https://i.ytimg.com/vi/fudYqnuns3E/maxresdefault.jpg",
      link: "https:www.elkjop.no",
      owner: 2,
    },
    {
      id: 3,
      title: "NTNU",
      imageURL:
        "https://tse1.mm.bing.net/th?id=OIP.oKAk1eaoTEy6Oobo7JOXsQHaCy&pid=Api&f=1",
      link: "https:www.ntnu.no",
      owner: 2,
    },
    {
      id: 4,
      title: "NMBU",
      imageURL:
        "https://www.monkeyperson.com/wp-content/uploads/2020/05/wide-image.jpg",
      link: "https:www.nmbu.no",
      owner: 3,
    },
  ],
  error: null,
};

const Store = ({ children }: any): any => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    // @ts-ignore
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
