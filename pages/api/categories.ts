import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../components/Types";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const categories: Category[] = [
    "Kjøretøy",
    "Møbler",
    "Dyr",
    "Hage",
    "Elektronikk",
    "Sykkel",
  ];
  res.statusCode = 200;
  res.json(categories);
};
