import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.user.update({
    where: {
      id: req.body["id"],
    },
    data: {
      role: req.body["role"],
    },
  });
  res.json(result);
};
