import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useGlobalState } from "./GlobalStateProvider";
import Link from "next/link";
import { useRouter } from "next/router";

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
          <Button
            data-cy="deleteAdBtn"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              dispatch({
                type: "REMOVE_ADVERTISEMENT",
                payload: state.advertisements[index].id,
              });
              setIndex((index + 1) % state.advertisements.length);
            }}
          >
            X
          </Button>
        )}

        {(state.currentUser === state.advertisements[index].owner ||
          (currentUser && currentUser.role === "admin")) && (
          <Button
            data-cy="editAdBtn"
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              router.push(
                "/edit-advertisement/" + state.advertisements[index].id
              );
            }}
          >
            Edit
          </Button>
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
