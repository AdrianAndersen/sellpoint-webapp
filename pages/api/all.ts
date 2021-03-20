import type { NextApiRequest, NextApiResponse } from "next";
import { GlobalState, User } from "../../lib/Types";
import prisma from "../../lib/prisma";
import { testData } from "../../lib/fixtures";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.DATABASE_URL) {
    res.status(200);
    res.json(testData);
  } else {
    const categoryData = await prisma.category.findMany();
    const userData = await prisma.user.findMany({
      include: {
        listings: {
          include: {
            categories: true,
          },
        },
        advertisements: true,
      },
    });

    const listings: any[] = [];
    const advertisements: any[] = [];

    const users = userData.map((user) => {
      const userObj: any = {
        ...user,
        location: { lat: Number(user.lat), lng: Number(user.lng) },
      };
      delete userObj.listings;
      delete userObj.advertisements;
      delete userObj.lat;
      delete userObj.lng;

      user.listings.forEach((listing: any) => {
        const listingObj = {
          ...listing,
          categories: (listing.categories || []).map(
            (cat: { name: string }) => cat.name
          ),
          owner: listing.ownerId,
        };
        delete listingObj.ownerId;
        listings.push(listingObj);
      });

      user.advertisements.forEach((ad: any) => {
        const advertisementObj = {
          ...ad,
          owner: ad.ownerId,
        };
        delete advertisementObj.ownerId;
        advertisements.push(advertisementObj);
      });
      return userObj as User;
    });

    const categories = categoryData.map((category) => category.name);

    const globalState: GlobalState = {
      currentUser: undefined,
      usingDB: true,
      users: users,
      listings: listings,
      categories: categories,
      advertisements: advertisements,
    };

    res.statusCode = 200;
    res.json(globalState);
  }
};
