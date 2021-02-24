import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "./Store";
import Link from "next/link";

const Slideshow = ({
  ads,
  deleteAdvertisement,
}: {
  ads: any[];
  deleteAdvertisement: any;
}) => {
  // @ts-ignore
  const [state] = useContext(Context);
  const [index, setIndex] = useState(0);
  const currentUser = state.users.find(
    (user: { id: number }) => user.id === state.currentUser
  );
  useEffect(() => {
    const interval = setTimeout(() => {
      setIndex((index + 1) % ads.length);
    }, 2000);

    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ads]);
  console.log(ads);
  return (
    <Link href={ads[index].link}>
      <div
        className="w-full bg-center bg-cover cursor-pointer"
        style={{
          backgroundImage: ads[index]
            ? "url(" + ads[index].imageURL + ")"
            : "none",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "gray",
          height: "10rem",
        }}
        title={ads[index]?.title}
      >
        {(state.currentUser === ads[index].owner ||
          (currentUser && currentUser.role === "admin")) && (
          <Button
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              deleteAdvertisement(ads[index].id);
              setIndex((index + 1) % ads.length);
            }}
          >
            X
          </Button>
        )}
      </div>
    </Link>
  );
};

const AdvertisementSlideshow = () => {
  // @ts-ignore
  const [state, dispatch] = useContext(Context);
  if (state.advertisements.length === 0) return <p>No ads</p>;
  return (
    <Slideshow
      ads={state.advertisements}
      deleteAdvertisement={(advertisementId: number) =>
        dispatch({ type: "REMOVE_ADVERTISEMENT", payload: advertisementId })
      }
    />
  );
};

export default AdvertisementSlideshow;
