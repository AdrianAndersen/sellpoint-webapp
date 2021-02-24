import ListingOverview from "../components/ListingOverview";
import AdvertisementSlideshow from "../components/AdvertisementSlideshow";
import { useContext } from "react";
import { Context } from "../components/Store";

export default function Home() {
  // @ts-ignore
  const [state, dispatch] = useContext(Context);
  return (
    <div className="h-full">
      <AdvertisementSlideshow />
      <ListingOverview
        listings={state.listings}
        deleteListing={(listingId: number) =>
          dispatch({ type: "REMOVE_LISTING", payload: listingId })
        }
      ></ListingOverview>
    </div>
  );
}
