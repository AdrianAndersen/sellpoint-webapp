import { Button, Card, Typography } from "@material-ui/core";
import { demoData, testData } from "../lib/fixtures";
import { info, success } from "../lib/toasts";
import Head from "next/head";
import { Advertisement, Category, Listing, User } from "../lib/Types";
import { useGlobalState } from "../components/StateManagement/GlobalStateProvider";

const DatabaseManager = () => {
  const { state } = useGlobalState();
  if (!state.usingDB)
    return (
      <Typography data-cy="databaseHeader" className="text-center" variant="h2">
        Du må være koblet til databasen for å bruke database-verktøyet
      </Typography>
    );

  const emptyDB = async () => {
    info("Tømmer database. Vennligst vent...");
    await fetch("/api/reset_db");
    setTimeout(() => success("Databasen ble tømt!"), 2000);
  };

  const loadUsers = async (users: User[]) => {
    users.forEach(
      async (user) =>
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
    );
  };

  const loadCategories = async (categories: Category[]) => {
    categories = categories.map((cat) => ({ name: cat })) as any;

    categories.forEach(
      async (category) =>
        await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        })
    );
  };

  const loadListings = async (listings: Listing[]) => {
    listings.forEach(
      async (listing) =>
        await fetch("/api/listings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listing),
        })
    );
  };
  const loadAdvertisements = async (advertisements: Advertisement[]) => {
    advertisements.forEach(
      async (advertisement) =>
        await fetch("/api/advertisements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(advertisement),
        })
    );
  };
  return (
    <>
      <Head>
        <title>Databaseverktøy | Sellpoint</title>
      </Head>
      <Card className="flex flex-wrap justify-center">
        <Typography
          data-cy="databaseHeader"
          className="w-full text-center"
          variant="h3"
        >
          Databaseverktøy
        </Typography>
        <p>
          Tøm først databasen. Velg deretter enten test- eller demo-data. Gi
          hver operasjon god tid{" "}
          <span aria-label="Snail Emoji" role="img">
            🐌
          </span>
        </p>
        <Button data-cy="emptyDB" className="w-full" onClick={() => emptyDB()}>
          Tøm Database
        </Button>
        <div className="text-center flex flex-col bg-red-100 m-10 p-5">
          <Typography variant="h5">Test-data</Typography>
          <Button
            data-cy="loadUsers"
            onClick={() => {
              info("Laster inn brukere og kategorier. Vennligst vent...");
              loadUsers(testData.users);
              loadCategories(testData.categories);
              setTimeout(
                () => success("Brukere og kategorier ble lastet inn!"),
                2000
              );
            }}
          >
            1. Last inn brukere og kategorier
          </Button>
          <Button
            data-cy="loadItems"
            onClick={() => {
              info("Laster inn annonser og reklamer. Vennligst vent...");
              loadAdvertisements(testData.advertisements);
              loadListings(testData.listings);
              setTimeout(
                () => success("Annonser og reklamer ble lastet inn!"),
                2000
              );
            }}
          >
            2. Last inn reklamer og annonser
          </Button>
        </div>
        <div className="text-center flex flex-col bg-green-100 m-10 p-5">
          <Typography variant="h5">Demo-data</Typography>
          <Button
            onClick={() => {
              loadUsers(demoData.users);
              loadCategories(demoData.categories);
            }}
          >
            1. Last inn brukere og kategorier
          </Button>
          <Button
            onClick={() => {
              loadAdvertisements(demoData.advertisements);
              loadListings(demoData.listings);
            }}
          >
            2. Last inn reklamer og annonser
          </Button>
        </div>
      </Card>
    </>
  );
};

export default DatabaseManager;
