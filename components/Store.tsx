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
      title: "Sykkel",
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/61OXtQ80V3L.jpg",
      description:
        "Rimelig Mountain bike. Dette er den rimeligste sykkelen vi har i sortimentet. Til tross for prisen er denne utstyrt med 21 gir, Dempere foran og skivebremser.",
      price: "600",
      owner: 1,
    },
    {
      id: 2,
      title: "Lamborghini Gallardo",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Orange_Lamborghini_Gallardo_LP560_fl.JPG",
      description: "LP500-4 / Capristo Eksos / Skinn / PDC / Navi /",
      price: "999 000",
      owner: 3,
    },
  ],
  advertisements: [
    {
      id: 1,
      title: "PPC ADS",
      imageURL:
        "https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_",
      link: "https://bitwarden.com/",
      owner: 2,
    },
    {
      id: 3,
      title: "The New Yorker",
      imageURL:
        "https://blog.hubspot.com/hubfs/How%20to%20Explain%20Banner%20Ads%20to%20Anyone-5.png",
      link: "https://blog.hubspot.com/",
      owner: 2,
    },
    {
      id: 4,
      title: "NTNU",
      imageURL:
        "https://www.akademika.no/sites/default/files/ntnu%20banner.png",
      link: "https:www.ntnu.no",
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
