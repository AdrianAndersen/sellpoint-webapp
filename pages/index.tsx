import ListingOverview from "../components/ListingOverview";
import AdvertisementSlideshow from "../components/AdvertisementSlideshow";

export default function Home() {
  return (
    <div className="h-full">
      <AdvertisementSlideshow />
      <ListingOverview></ListingOverview>
    </div>
  );
}
