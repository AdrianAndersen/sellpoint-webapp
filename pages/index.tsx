import ListingOverview from "../components/Listing/ListingOverview";
import AdvertisementSlideshow from "../components/Advertisement/AdvertisementSlideshow";

export default function Home() {
  return (
    <div className="h-full">
      <AdvertisementSlideshow />

      <ListingOverview />
    </div>
  );
}
