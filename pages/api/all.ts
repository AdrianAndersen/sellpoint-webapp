import type { NextApiRequest, NextApiResponse } from "next";
import { GlobalState, User } from "../../lib/Types";
import prisma from "../../lib/prisma";
import { testData } from "../../lib/fixtures";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
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
          ownRatings: true,
        },
      });

      const listings: any[] = [];
      const advertisements: any[] = [];

      const users = userData.map((user) => {
        const userObj: any = {
          ...user,
          location: { lat: Number(user.lat), lng: Number(user.lng) },
          ratings: user.ownRatings.map((rating) => ({
            from: rating.fromId,
            rating: rating.rating,
          })),
        };
        delete userObj.listings;
        delete userObj.advertisements;
        delete userObj.ownRatings;
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
  } else if (req.method === "POST") {
    await prisma.listing.deleteMany();
    await prisma.advertisement.deleteMany();
    await prisma.category.deleteMany();
    await prisma.rating.deleteMany();
    await prisma.user.deleteMany();

    const users = req.body["users"];
    const categories = req.body["categories"];
    const listings = req.body["listings"];
    const advertisements = req.body["advertisements"];

    for (const user of users as User[]) {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          username: user.username,
          password: user.password,
          phoneNumber: user.phoneNumber,
          role: user.role,
          lat: user.location.lat,
          lng: user.location.lng,
          ownRatings: {
            create: user.ratings.map((rating) => ({
              fromId: rating.from,
              rating: rating.rating,
            })),
          },
        },
      });
    }
    for (const category of categories) {
      await prisma.category.create({
        data: {
          name: category,
        },
      });
    }
    for (const listing of listings) {
      await prisma.listing.create({
        data: {
          title: listing.title,
          imageURL: listing.imageURL,
          description: listing.description,
          price: listing.price,
          owner: { connect: { id: listing.owner } },
          categories: {
            connect: listing.categories.map((cat: string) => ({ name: cat })),
          },
        },
      });
    }
    for (const advertisement of advertisements) {
      await prisma.advertisement.create({
        data: {
          title: advertisement.title,
          imageURL: advertisement.imageURL,
          link: advertisement.link,
          owner: { connect: { id: advertisement.owner } },
        },
      });
    }
    res.json(200);
  }
};
