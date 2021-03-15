import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../components/Types";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const users: User[] = [
    {
      id: "1",
      name: "Ola Halvorsen",
      phoneNumber: "98765432",
      username: "ola",
      password: "ola",
      role: "private",
      location: { lat: 63.436179, lng: 10.417865 },
    },
    {
      id: "2",
      name: "Erna Solberg",
      phoneNumber: "12345677",
      username: "erna",
      password: "erna",
      role: "business",
      location: { lat: 63.418769, lng: 10.403894 },
    },
    {
      id: "3",
      name: "Admin Adminsen",
      phoneNumber: "1234567",
      username: "admin",
      password: "admin",
      role: "admin",
      location: { lat: 63.426926, lng: 10.395967 },
    },
  ];
  res.statusCode = 200;
  res.json(users);
};
