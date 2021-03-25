import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.listing.deleteMany();
  await prisma.advertisement.deleteMany();
  await prisma.category.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.user.deleteMany();

  res.json(200);
};
