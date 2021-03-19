import { info, success, warning } from "../../lib/toasts";
import { DispatchObject, GlobalState } from "../../lib/Types";

const Reducer = (state: GlobalState, action: DispatchObject) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...action.payload };
    case "ADD_USER":
      info("En bruker ble opprettet.");
      return {
        ...state,
        users: state.users.concat(action.payload),
        currentUser: action.payload.id,
      };
    case "REMOVE_USER":
      warning("En bruker ble slettet.");
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "SET_CURRENT_USER":
      success("Login var vellykket!");
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_LISTINGS":
      return {
        ...state,
        listings: action.payload,
      };
    case "ADD_LISTING":
      info("En annonse ble opprettet.");
      return {
        ...state,
        listings: state.listings.concat(action.payload),
      };
    case "REMOVE_LISTING":
      warning("En annonse ble fjernet.");
      return {
        ...state,
        listings: state.listings.filter(
          (listing) => listing.id !== action.payload
        ),
      };
    case "ADD_CATEGORY":
      info("En kategori ble opprettet.");
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      };
    case "ADD_ADVERTISEMENT":
      info("En reklame ble opprettet.");
      return {
        ...state,
        advertisements: [action.payload, ...state.advertisements],
      };
    case "REMOVE_ADVERTISEMENT":
      warning("En reklame ble fjernet.");
      return {
        ...state,
        advertisements: state.advertisements.filter(
          (advertisement) => advertisement.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default Reducer;
