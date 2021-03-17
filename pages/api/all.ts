import { Decimal } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Advertisement,
  GlobalState,
  LatLng,
  Listing,
  User,
} from "../../components/Types";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userData = await prisma.user.findMany();
  const listingData = await prisma.listing.findMany({
    include: { categories: true },
  });
  const categoryData = await prisma.category.findMany();
  const advertisementData = await prisma.advertisement.findMany();

  const users = userData.map((user) => {
    const userObj: { lat?: Decimal; lng?: Decimal; location: LatLng } = {
      ...user,
      location: { lat: Number(user.lat), lng: Number(user.lng) },
    };
    delete userObj.lat;
    delete userObj.lng;
    return userObj as User;
  });

  const listings = listingData.map(
    (listing: { ownerId?: number; categories?: { name: string }[] }) => {
      const listingObj = {
        ...listing,
        categories: (listing.categories || []).map((cat) => cat.name),
        owner: listing.ownerId,
      };
      delete listingObj.ownerId;
      return listingObj as Listing;
    }
  );

  const categories = categoryData.map((category) => category.name);

  const advertisements = advertisementData.map(
    (advertisement: { ownerId?: number }) => {
      const advertisementObj = {
        ...advertisement,
        owner: advertisement.ownerId,
      };
      delete advertisementObj.ownerId;
      return advertisementObj as Advertisement;
    }
  );

  const globalState: GlobalState = {
    currentUser: undefined,
    users: users,
    listings: listings,
    categories: categories,
    advertisements: advertisements,
  };

  res.statusCode = 200;
  res.json(globalState);
};
