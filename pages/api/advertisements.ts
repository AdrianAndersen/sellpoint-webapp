import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await prisma.advertisement.create({
      data: {
        title: req.body["title"],
        imageURL: req.body["imageURL"],
        link: req.body["link"],
        owner: { connect: { id: req.body["owner"] } },
      },
    });
    res.json(result);
  } else if (req.method === "DELETE") {
    const result = await prisma.advertisement.delete({
      where: { id: req.body["id"] },
    });
    res.json(result);
  }
};
