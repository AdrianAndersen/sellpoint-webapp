import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings = [
    {
      title: "Elkjøps nyttårssalg",
      imageURL: "img_url",
      link: "https:www.elkjop.no",
    },
    {
      title: "Nille",
      imageURL: "img_url2",
      link: "https:www.nille.no",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
