import { success, error } from "./toasts";

const fetchData = async (method: string, data: any, links: string) => {
  try {
    return await fetch(links, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      success("Oppdatering var vellykket!");
      return response.json();
    });
  } catch (e) {
    error("Oppdatering var ikke vellykket");
  }
};

export const deleteAdDB = async (data: any) => {
  return await fetchData("DELETE", data, "/api/advertisements");
};
export const createAdDB = async (data: any) => {
  return await fetchData("POST", data, "/api/advertisements");
};

export const deleteListingDB = async (data: any) => {
  return await fetchData("DELETE", data, "/api/listings");
};

export const createListingDB = async (data: any) => {
  return await fetchData("POST", data, "/api/listings");
};

export const patchListingDB = async (data: any) => {
  return await fetchData("PATCH", data, "/api/listings");
};

export const addCategoryDB = async (data: any) => {
  return await fetchData("POST", data, "/api/categories");
};

export const addUserDB = (data: any) => {
  return fetchData("POST", data, "/api/users");
};

export const updateUserDB = (data: any) => {
  return fetchData("PATCH", data, "/api/users");
};

export const deleteUserDB = async (data: any) => {
  return await fetchData("DELETE", data, "/api/users");
};

export const addAllDB = async (data: any) => {
  return await fetchData("POST", data, "/api/all");
};
