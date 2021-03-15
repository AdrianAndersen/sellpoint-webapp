import { DispatchObject, GlobalState } from "./Types";

const Reducer = (state: GlobalState, action: DispatchObject) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...action.payload };
    case "ADD_USER":
      return {
        ...state,
        users: state.users.concat(action.payload),
        currentUser: action.payload.id,
      };
    case "SET_CURRENT_USER":
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
      return {
        ...state,
        listings: state.listings.concat(action.payload),
      };
    case "REMOVE_LISTING":
      return {
        ...state,
        listings: state.listings.filter(
          (listing) => listing.id !== action.payload
        ),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      };
    case "ADD_ADVERTISEMENT":
      return {
        ...state,
        advertisements: [action.payload, ...state.advertisements],
      };
    case "REMOVE_ADVERTISEMENT":
      return {
        ...state,
        advertisements: state.advertisements.filter(
          (advertisement) => advertisement.id !== action.payload
        ),
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
