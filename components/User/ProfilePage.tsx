import { Card, Typography } from "@material-ui/core";
import { User } from "../../lib/Types";
import AdvertisementSlideshow from "../Advertisement/AdvertisementSlideshow";
import GoogleMapsComponent from "../GoogleMaps/GoogleMapsComponent";
import ListingOverview from "../Listing/ListingOverview";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";

const ProfilePage = ({ user }: { user: User }) => {
  const { state } = useGlobalState();
  const userRole =
    user.role === "private"
      ? "Privatbruker"
      : user.role === "business"
      ? "Bedriftsbruker"
      : "Administrator";
  const userListings = state.listings.filter(
    (listing) => listing.owner === user.id
  );
  const userAds = state.advertisements.filter((ad) => ad.owner === user.id);

  return (
    <Card className="flex flex-row flex-wrap justify-center">
      <div data-cy="userInfo" className="ml-5 w-full">
        <Typography variant="h4">
          {user.name} ({user.username})
        </Typography>
        <Typography variant="h6">Kontakt: {user.phoneNumber}</Typography>
        <Typography variant="h6">{userRole}</Typography>
        <GoogleMapsComponent
          initialMarkers={[user.location]}
          user={user}
          readonly={true}
        />
      </div>

      {user.role !== "business" && (
        <>
          <Typography variant="h4" className="text-center w-full">
            Annonser
          </Typography>
          {userListings.length > 0 ? (
            <ListingOverview specificListings={userListings} />
          ) : (
            <p>Brukeren har ingen annonser.</p>
          )}
        </>
      )}

      {user.role !== "private" && (
        <>
          <Typography variant="h4" className="text-center w-full">
            Reklamer
          </Typography>
          {userAds.length > 0 ? (
            <AdvertisementSlideshow specificAds={userAds} />
          ) : (
            <p>Brukeren har ingen reklamer.</p>
          )}
        </>
      )}
    </Card>
  );
};

export default ProfilePage;
