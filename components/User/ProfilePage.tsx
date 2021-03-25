import { Card, IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useRouter } from "next/router";
import { User } from "../../lib/Types";
import AdvertisementSlideshow from "../Advertisement/AdvertisementSlideshow";
import GoogleMapsComponent from "../GoogleMaps/GoogleMapsComponent";
import ListingOverview from "../Listing/ListingOverview";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import Rating from "./Rating";
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
  const isMyProfile = state.currentUser === user.id;
  const currentUser = state.users.find((user) => user.id === state.currentUser);
  const userIsAdmin = user.role === "admin";
  const hasEditPerm =
    currentUser &&
    (isMyProfile || currentUser.role === "admin") &&
    !userIsAdmin;

  const router = useRouter();

  return (
    <Card className="flex flex-row flex-wrap justify-center p-5">
      <div data-cy="userInfo" className="w-full text-center">
        <div className="flex flex-row w-full justify-center">
          <Typography variant="h4">
            {user.name} ({user.username})
          </Typography>
          {hasEditPerm && (
            <IconButton
              data-cy="editUserBtn"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                router.push("/edit-user/" + user.id);
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <Typography variant="h6">Kontakt: {user.phoneNumber}</Typography>
        <Typography variant="h6">{userRole}</Typography>
        <GoogleMapsComponent
          initialMarkers={[user.location]}
          user={user}
          readonly={true}
        />

        {user.role === "private" && <Rating user={user} />}
      </div>

      {user.role !== "business" && (
        <div className="mt-5 w-full">
          <Typography variant="h4" className="text-center">
            Annonser
          </Typography>
          {userListings.length > 0 ? (
            <ListingOverview specificListings={userListings} />
          ) : (
            <p className="text-center">Brukeren har ingen annonser.</p>
          )}
        </div>
      )}

      {user.role !== "private" && (
        <div className="mt-5 w-full">
          <Typography variant="h4" className="text-center w-full">
            Reklamer
          </Typography>
          {userAds.length > 0 ? (
            <AdvertisementSlideshow specificAds={userAds} />
          ) : (
            <p className="text-center">Brukeren har ingen reklamer.</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProfilePage;
