import ListingOverview from "../components/ListingOverview";
import AdvertisementSlideshow from "../components/AdvertisementSlideshow";
import { useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import { Category, GlobalState } from "../components/Types";
import { useGlobalState } from "../components/GlobalStateProvider";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await (await fetch("http://localhost:3000/api/users")).json();
  const listings = await (
    await fetch("http://localhost:3000/api/listings")
  ).json();
  const categories = await (
    await fetch("http://localhost:3000/api/categories")
  ).json();
  const advertisements = await (
    await fetch("http://localhost:3000/api/advertisements")
  ).json();

  const initialState: GlobalState = JSON.parse(
    JSON.stringify({
      currentUser: undefined,
      users: users,
      listings: listings,
      categories: categories,
      advertisements: advertisements,
      error: null,
      status: "ok",
    })
  );
  return {
    props: { initialState },
  };
};

export default function Home({ initialState }: { initialState: GlobalState }) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { dispatch, state } = useGlobalState();
  useEffect(() => {
    if (!state.status) {
      dispatch({ type: "SET_STATE", payload: initialState });
    }
  }, [initialState, dispatch, state.status]);
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
