import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json(await (await prisma.category.findMany()).map((cat) => cat.name));
};
