import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const listings = [
    {
      title: "Elkjøps nyttårssalg",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FfudYqnuns3E%2Fmaxresdefault.jpg&f=1&nofb=1",
      link: "https:www.elkjop.no",
    },
    {
      title: "Nille",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fdigital-photography-school.com%2Fwp-content%2Fuploads%2F2012%2F10%2Fimage5.jpg&f=1&nofb=1",
      link: "https:www.nille.no",
    },
    {
      title: "NTNu",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.oKAk1eaoTEy6Oobo7JOXsQHaCy%26pid%3DApi&f=1",
      link: "https:www.nille.no",
    },
    {
      title: "NMBU",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.monkeyperson.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fwide-image.jpg&f=1&nofb=1",
      link: "https:www.nille.no",
    },
    {
      title: "Boller",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2019%2F09%2F08%2F669951-monobeno-cura-highres-wide-image-game-cg-cloud-clouds-748x210.jpg&f=1&nofb=1",
      link: "https:www.nille.no",
    },
  ];
  res.statusCode = 200;
  res.json(listings);
};
