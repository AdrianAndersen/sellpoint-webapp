import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await prisma.user.create({
      data: {
        name: req.body["name"],
        username: req.body["username"],
        password: req.body["password"],
        phoneNumber: req.body["phoneNumber"],
        role: req.body["role"],
        lat: req.body["location"]["lat"],
        lng: req.body["location"]["lng"],
      },
    });
    res.json(result);
  } else if (req.method === "DELETE") {
    const result = await prisma.user.delete({
      where: { id: req.body["id"] },
    });
    res.json(result);
  }
};
