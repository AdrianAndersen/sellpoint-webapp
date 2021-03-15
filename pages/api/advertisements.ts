import type { NextApiRequest, NextApiResponse } from "next";
import { Advertisement } from "../../components/Types";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  const advertisements: Advertisement[] = [
    {
      id: "1",
      title: "PPC ADS",
      imageURL:
        "https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_",
      link: "https://bitwarden.com/",
      owner: "2",
    },
    {
      id: "3",
      title: "The New Yorker",
      imageURL:
        "https://blog.hubspot.com/hubfs/How%20to%20Explain%20Banner%20Ads%20to%20Anyone-5.png",
      link: "https://blog.hubspot.com/",
      owner: "2",
    },
    {
      id: "4",
      title: "NTNU",
      imageURL:
        "https://www.akademika.no/sites/default/files/ntnu%20banner.png",
      link: "https:www.ntnu.no",
      owner: "3",
    },
  ];
  res.statusCode = 200;
  res.json(advertisements);
};
