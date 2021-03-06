import { Advertisement } from "../../lib/Types";

const validateAdvertisement = (
  advertisement: Partial<Advertisement>
): boolean => {
  return (
    advertisement != undefined &&
    advertisement.title != undefined &&
    advertisement.link != undefined &&
    advertisement.imageURL != undefined &&
    advertisement.owner != undefined
  );
};

export default validateAdvertisement;
