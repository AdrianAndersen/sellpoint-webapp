import { Advertisement } from "../Types";

const validateAdvertisement = (advertisement: Partial<Advertisement>): boolean => {
  return (
 
    advertisement != undefined &&
    advertisement.id != undefined &&
    advertisement.title != undefined &&
    advertisement.link != undefined &&
    advertisement.imageURL != undefined &&
    advertisement.owner != undefined
  );

};

export default validateAdvertisement;

