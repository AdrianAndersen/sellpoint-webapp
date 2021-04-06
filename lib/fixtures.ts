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
    },
    {
      id: 2,
      name: "Erna Solberg",
      phoneNumber: "12345677",
      username: "erna",
      password: "erna",
      role: "business",
      location: { lat: 63.418769, lng: 10.403894 },
    },
    {
      id: 3,
      name: "Admin Adminsen",
      phoneNumber: "1234567",
      username: "admin",
      password: "admin",
      role: "admin",
      location: { lat: 63.426926, lng: 10.395967 },
    },
    {
      id: 4,
      name: "Sverre Sturlasson",
      phoneNumber: "45671881",
      username: "sverre",
      password: "sverre",
      role: "private",
      location: { lat: 63.406926, lng: 10.395967 },
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

export const demoData: GlobalState = {
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
      name: "Biltema",
      phoneNumber: "12345677",
      username: "biltema",
      password: "biltema",
      role: "business",
      location: { lat: 63.418769, lng: 10.403894 },
      ratings: [],
    },
    {
      id: 3,
      name: "Admin",
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
      title: "Tesla model S",
      imageURL:
        "https://img.gfx.no/2626/2626064/Tesla%20Model%20S%20-%201%20%287%29.1000x563.jpg",
      description: "Meget pent brukt. Nesten som ny.",
      price: 300000,
      categories: ["Kjøretøy"],
      owner: 3,
      sold: false,
    },
    {
      id: 3,
      title: "Solcelledrevet mobillader",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgjzoPfn00B__HXbBn2Gz-ETd3-i3cQZMxeQ&usqp=CAU",
      description: "Gir mange timer ekstra levetid for mobilen",
      price: 100,
      categories: ["Elektronikk"],
      owner: 4,
      sold: false,
    },
  ],
  categories: ["Kjøretøy", "Møbler", "Dyr", "Hage", "Elektronikk", "Sykkel"],
  advertisements: [
    {
      id: 1,
      title: "Biltema",
      imageURL:
        "data:image/png;base64,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",
      link: "https://www.biltema.no/",
      owner: 2,
    },
    {
      id: 3,
      title: "Naturvernforbundet",
      imageURL:
        "https://naturvernforbundet.no/getfile.php/1327225-1308900581/logoer/Naturvernforbundet/Logo%20gr%C3%B8nn%20stor%20RGB.jpg",
      link: "https://naturvernforbundet.no/",
      owner: 3,
    },
    {
      id: 4,
      title: "World wildlife fund",
      imageURL:
        "https://c402277.ssl.cf1.rackcdn.com/photos/10316/images/cropped/GiantPanda-grey-cta.jpg?1446507644",
      link: "https://www.worldwildlife.org/",
      owner: 3,
    },
  ],
};
