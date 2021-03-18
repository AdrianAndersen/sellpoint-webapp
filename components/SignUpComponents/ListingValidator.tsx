import { Listing } from "../Types";

const validateListing = (listing: Partial<Listing>): boolean => {
  return (
 
    listing != undefined &&
    listing.title != undefined &&
    listing.description != undefined &&
    listing.price != undefined &&
    listing.imageURL != undefined &&
    listing.owner != undefined &&
    listing.categories != undefined
  );

};

export default validateListing;
