import { IconButton } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useGlobalState } from "../StateManagement/GlobalStateProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Advertisement } from "../../lib/Types";

const Slideshow = ({ ads }: { ads: Advertisement[] }) => {
  const { state, dispatch } = useGlobalState();
  const [index, setIndex] = useState(0);
  const currentUser = state.users.find((user) => user.id === state.currentUser);

  const router = useRouter();

  useEffect(() => {
    const interval = setTimeout(() => {
      setIndex((index + 1) % ads.length);
    }, 2000);

    return () => clearTimeout(interval);
  }, [index, ads]);

  return (
    <Link href={ads[index].link}>
      <div
        data-cy="adSlide"
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
          <span className="inline-block bg-gray-50 m-2 p-1 rounded">
            <IconButton
              data-cy="editAdBtn"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                router.push("/edit-advertisement/" + ads[index].id);
              }}
            >
              <EditIcon />
            </IconButton>
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
                    body: JSON.stringify({
                      id: ads[index].id,
                    }),
                  }).then((response) => response.json());
                }

                if (response || !state.usingDB) {
                  dispatch({
                    type: "REMOVE_ADVERTISEMENT",
                    payload: ads[index].id,
                  });
                  setIndex(0);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        )}
      </div>
    </Link>
  );
};

const AdvertisementSlideshow = ({
  specificAds,
}: {
  specificAds?: Advertisement[];
}) => {
  const { state } = useGlobalState();
  if (state.advertisements.length === 0) return <p>Ingen reklamer å vise...</p>;
  return <Slideshow ads={specificAds ? specificAds : state.advertisements} />;
};

export default AdvertisementSlideshow;
