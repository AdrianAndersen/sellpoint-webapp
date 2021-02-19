import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings = [
    {
      title: "My first listing",
      imageURL:
        "https://images.unsplash.com/photo-1612135945668-0c2190dfac07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      description: "My first description",
      createdBy: "ola.halvorsen@gmail.com",
      price: "123",
    },
    {
      title: "My second listing",
      imageURL:
        "https://images.unsplash.com/photo-1612174462937-171b1f2e7e68?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      description: "My second description",
      createdBy: "ida.pettersen@gmail.com",
      price: "321",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
