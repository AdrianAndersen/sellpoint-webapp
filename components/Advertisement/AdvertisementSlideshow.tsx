import { IconButton } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Slideshow = () => {
  const { state, dispatch } = useGlobalState();
  const [index, setIndex] = useState(0);
  const currentUser = state.users.find((user) => user.id === state.currentUser);

  const router = useRouter();

  useEffect(() => {
    const interval = setTimeout(() => {
      setIndex((index + 1) % state.advertisements.length);
    }, 2000);

    return () => clearTimeout(interval);
  }, [index, state.advertisements]);

  return (
    <Link href={state.advertisements[index].link}>
      <div
        data-cy="adSlide"
        className="w-full bg-center bg-cover cursor-pointer"
        style={{
          backgroundImage: state.advertisements[index]
            ? "url(" + state.advertisements[index].imageURL + ")"
            : "none",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "gray",
          height: "10rem",
        }}
        title={state.advertisements[index]?.title}
      >
        {(state.currentUser === state.advertisements[index].owner ||
          (currentUser && currentUser.role === "admin")) && (
          <IconButton
            data-cy="deleteAdBtn"
            color="secondary"
            onClick={async (e) => {
              e.preventDefault();
              let response;
              if (state.usingDB) {
                response = await fetch("/api/advertisements", {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: state.advertisements[index].id }),
                }).then((response) => response.json());
              }

              if (response || !state.usingDB) {
                dispatch({
                  type: "REMOVE_ADVERTISEMENT",
                  payload: state.advertisements[index].id,
                });
                setIndex(0);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}

        {(state.currentUser === state.advertisements[index].owner ||
          (currentUser && currentUser.role === "admin")) && (
          <IconButton
            data-cy="editAdBtn"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              router.push(
                "/edit-advertisement/" + state.advertisements[index].id
              );
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
    </Link>
  );
};

const AdvertisementSlideshow = () => {
  const { state } = useGlobalState();
  if (state.advertisements.length === 0) return <p>Ingen reklamer å vise...</p>;
  return <Slideshow />;
};

export default AdvertisementSlideshow;
