import { Decimal } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Advertisement,
  GlobalState,
  LatLng,
  Listing,
  User,
} from "../../components/Types";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.DATABASE_URL) {
    const globalState: GlobalState = {
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
        },
      ],
      categories: [
        "Kjøretøy",
        "Møbler",
        "Dyr",
        "Hage",
        "Elektronikk",
        "Sykkel",
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
    };
    res.status(200);
    res.json(globalState);
  } else {
    const userData = await prisma.user.findMany();
    const listingData = await prisma.listing.findMany({
      include: { categories: true },
    });
    const categoryData = await prisma.category.findMany();
    const advertisementData = await prisma.advertisement.findMany();
    const users = userData.map((user) => {
      const userObj: { lat?: Decimal; lng?: Decimal; location: LatLng } = {
        ...user,
        location: { lat: Number(user.lat), lng: Number(user.lng) },
      };
      delete userObj.lat;
      delete userObj.lng;
      return userObj as User;
    });

    const listings = listingData.map(
      (listing: { ownerId?: number; categories?: { name: string }[] }) => {
        const listingObj = {
          ...listing,
          categories: (listing.categories || []).map((cat) => cat.name),
          owner: listing.ownerId,
        };
        delete listingObj.ownerId;
        return listingObj as Listing;
      }
    );

    const categories = categoryData.map((category) => category.name);

    const advertisements = advertisementData.map(
      (advertisement: { ownerId?: number }) => {
        const advertisementObj = {
          ...advertisement,
          owner: advertisement.ownerId,
        };
        delete advertisementObj.ownerId;
        return advertisementObj as Advertisement;
      }
    );

    const globalState: GlobalState = {
      currentUser: undefined,
      usingDB: true,
      users: users,
      listings: listings,
      categories: categories,
      advertisements: advertisements,
    };

    res.statusCode = 200;
    res.json(globalState);
  }
};
