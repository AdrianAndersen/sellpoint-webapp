import { info, warning } from "./toasts";
import { GlobalState } from "./Types";

export const emptyDB = async () => {
  info("Attempting to reset database. Please stand by...");
  await fetch("/api/reset_db");
};

const populateDB = async (data: GlobalState) => {
  info("Attempting to populate database. Please stand by...");
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
  warning(
    "All requests sent. Please wait a few seconds, then reload the page to see the result."
  );
};

export default populateDB;
