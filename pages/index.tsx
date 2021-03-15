import ListingOverview from "../components/ListingOverview";
import AdvertisementSlideshow from "../components/AdvertisementSlideshow";
import { useContext, useState } from "react";
import { Context } from "../components/Store";
import CategorySelect from "../components/CategorySelect/CategorySelect";

export default function Home() {
  // @ts-ignore
  const [state, dispatch] = useContext(Context);
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className="h-full">
      <AdvertisementSlideshow />
      <CategorySelect
        selected={selectedCategories}
        onChange={(newCategories: any) => setSelectedCategories(newCategories)}
      />
      <ListingOverview
        listings={state.listings}
        categories={selectedCategories}
        deleteListing={(listingId: number) =>
          dispatch({ type: "REMOVE_LISTING", payload: listingId })
        }
      ></ListingOverview>
    </div>
  );
}
