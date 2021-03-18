import { GlobalState } from "./Types";

export const emptyDB = async () => {
  await fetch("/api/reset_db");
};

const populateDB = async (data: GlobalState) => {
  let { listings, advertisements, users, categories } = data;
  emptyDB();

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

export default populateDB;
