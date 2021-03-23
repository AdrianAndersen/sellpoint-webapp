import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await prisma.user.create({
      data: {
        id: req.body["id"],
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
    for (const listing of req.body["listings"]) {
      await prisma.listing.delete({
        where: { id: listing },
      });
    }

    for (const ad of req.body["ads"]) {
      await prisma.advertisement.delete({
        where: { id: ad },
      });
    }
    await prisma.user.delete({
      where: { id: req.body["userId"] },
    });
    res.json(200);
  } else if (req.method === "PATCH") {
    await prisma.user.delete({
      where: { id: req.body["id"] },
    });
    res.json(200);
  }
};
