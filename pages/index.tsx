import ListingOverview from "../components/ListingOverview";
import AdComponent from "../components/AdvertisementComp";
export default function Home() {
  return (
    <div className="h-full">
      <AdComponent />
      <ListingOverview></ListingOverview>
    </div>
  );
}
