import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings = [
    {
      title: "My first listing",
      imageURL: "img_url",
      description: "My first description",
      createdBy: "ola.halvorsen@gmail.com",
      price: "123",
    },
    {
      title: "My second listing",
      imageURL: "img_url",
      description: "My second description",
      createdBy: "ida.pettersen@gmail.com",
      price: "321",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
