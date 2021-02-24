import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings = [
    {
      title: "Elkjøps nyttårssalg",
      imageURL: "https://i.ytimg.com/vi/fudYqnuns3E/maxresdefault.jpg",
      link: "https:www.elkjop.no",
    },
    {
      title: "Nille",
      imageURL:
        "http://digital-photography-school.com/wp-content/uploads/2012/10/image5.jpg",
      link: "https:www.nille.no",
    },
    {
      title: "NTNu",
      imageURL:
        "https://tse1.mm.bing.net/th?id=OIP.oKAk1eaoTEy6Oobo7JOXsQHaCy&pid=Api&f=1",
      link: "https:www.nille.no",
    },
    {
      title: "NMBU",
      imageURL:
        "https://www.monkeyperson.com/wp-content/uploads/2020/05/wide-image.jpg",
      link: "https:www.nille.no",
    },
    {
      title: "Boller",
      imageURL:
        "https://wallup.net/wp-content/uploads/2019/09/08/669951-monobeno-cura-highres-wide-image-game-cg-cloud-clouds-748x210.jpg",
      link: "https:www.nille.no",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
