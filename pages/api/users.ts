import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings = [
    {
      firstName: "Ola",
      lastName: "Halvorsen",
      dateOfBirth: "29.07.2000",
      gender: "male",
      phoneNumber: "98765432",
      username: "ola.halvorsen@gmail.com",
      password: "very secret pass",
    },
    {
      firstName: "Ida",
      lastName: "Pettersen",
      dateOfBirth: "20.02.1929",
      gender: "female",
      phoneNumber: "12345677",
      username: "ida.pettersen@gmail.com",
      password: "password",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
