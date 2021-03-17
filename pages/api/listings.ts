import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await prisma.listing.create({
      data: {
        title: req.body["title"],
        imageURL: req.body["imageURL"],
        description: req.body["description"],
        price: req.body["price"],
        owner: { connect: { id: req.body["owner"] } },
        categories: {
          connect: req.body["categories"].map((cat: string) => ({ name: cat })),
        },
      },
    });
    res.json(result);
  } else if (req.method === "DELETE") {
    const result = await prisma.listing.delete({
      where: { id: req.body["id"] },
    });
    res.json(result);
  }
};
