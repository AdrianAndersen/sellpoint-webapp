import ListingOverview from "../components/ListingOverview";
import AdvertisementSlideshow from "../components/AdvertisementSlideshow";
import { useState } from "react";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import { Category } from "../components/Types";

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
