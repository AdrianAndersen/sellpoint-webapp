import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await prisma.category.create({
      data: {
        name: req.body["name"],
      },
    });
    res.json(result);
  } else if (req.method === "DELETE") {
    const result = await prisma.category.delete({
      where: { name: req.body["name"] },
    });
    res.json(result);
  }
};
