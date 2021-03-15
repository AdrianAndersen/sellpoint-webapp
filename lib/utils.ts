import { ID } from "../components/Types";

export const getUniqueId = (existingIDs: ID[]): ID => {
  const randomId = Math.random().toString(36).substring(7);
  if (existingIDs.includes(randomId)) {
    return getUniqueId(existingIDs);
  }
  return randomId;
};
