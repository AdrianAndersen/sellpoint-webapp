import type { NextApiRequest, NextApiResponse } from "next";
import { Listing } from "../../components/Types";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings: Listing[] = [
    {
      id: "1",
      title: "Sykkel",
      imageURL:
        "https://images-na.ssl-images-amazon.com/images/I/61OXtQ80V3L.jpg",
      description:
        "Rimelig Mountain bike. Dette er den rimeligste sykkelen vi har i sortimentet. Til tross for prisen er denne utstyrt med 21 gir, Dempere foran og skivebremser.",
      price: 600,
      categories: ["Sykkel"],
      owner: "1",
    },
    {
      id: "2",
      title: "Lamborghini Gallardo",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Orange_Lamborghini_Gallardo_LP560_fl.JPG",
      description: "LP500-4 / Capristo Eksos / Skinn / PDC / Navi /",
      price: 999000,
      categories: ["Kjøretøy"],
      owner: "3",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
