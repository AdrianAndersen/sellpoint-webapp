import { GlobalState } from "./Types";

export const testData: GlobalState = {
  currentUser: undefined,
  usingDB: false,
  users: [
    {
      id: 1,
      name: "Ola Halvorsen",
      phoneNumber: "98765432",
      username: "ola",
      password: "ola",
      role: "private",
      location: { lat: 63.436179, lng: 10.417865 },
      ratings: [],
    },
    {
      id: 2,
      name: "Erna Solberg",
      phoneNumber: "12345677",
      username: "erna",
      password: "erna",
      role: "business",
      location: { lat: 63.418769, lng: 10.403894 },
      ratings: [],
    },
    {
      id: 3,
      name: "Admin Adminsen",
      phoneNumber: "1234567",
      username: "admin",
      password: "admin",
      role: "admin",
      location: { lat: 63.426926, lng: 10.395967 },
      ratings: [],
    },
    {
      id: 4,
      name: "Sverre Sturlasson",
      phoneNumber: "45671881",
      username: "sverre",
      password: "sverre",
      role: "private",
      location: { lat: 63.406926, lng: 10.395967 },
      ratings: [],
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
      price: 600,
      categories: ["Sykkel"],
      owner: 1,
      sold: false,
    },
    {
      id: 2,
      title: "Lamborghini Gallardo",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Orange_Lamborghini_Gallardo_LP560_fl.JPG",
      description: "LP500-4 / Capristo Eksos / Skinn / PDC / Navi /",
      price: 999000,
      categories: ["Kjøretøy"],
      owner: 3,
      sold: false,
    },
    {
      id: 3,
      title: "Volvo 240",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/1990_volvo_240dl_wagon_4.jpg",
      description:
        "Ei knakanes fin Volvo 240. Den er det stikk motsatte av bæljåte, og selges for en rimelig pris!",
      price: 33690,
      categories: ["Kjøretøy"],
      owner: 1,
      sold: false,
    },
  ],
  categories: ["Kjøretøy", "Møbler", "Dyr", "Hage", "Elektronikk", "Sykkel"],
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
};

// TODO
export const demoData: GlobalState = {
  currentUser: undefined,
  usingDB: false,
  users: [],
  listings: [],
  advertisements: [],
  categories: [],
};
