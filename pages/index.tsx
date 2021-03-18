import ListingOverview from "../components/Listing/ListingOverview";
import AdvertisementSlideshow from "../components/Advertisement/AdvertisementSlideshow";
import { useState } from "react";
import CategorySelect from "../components/Listing/CategorySelect";
import { Category } from "../lib/Types";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  return (
    <div className="h-full">
      <AdvertisementSlideshow />
      <CategorySelect
        selected={selectedCategories}
        setSelected={setSelectedCategories}
      />
      <ListingOverview categories={selectedCategories}></ListingOverview>
    </div>
  );
}
