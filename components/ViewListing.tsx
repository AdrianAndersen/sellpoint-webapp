import useSWR from "swr";
import React from "react";
import { Typography } from "@material-ui/core";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ViewListing = ({ index }: { index: number }) => {
  const { data, error } = useSWR("/api/listings", fetcher);
  if (error) return <div>Failed to load listings</div>;
  if (!data) return <div>Loading...</div>;

  const listing = data[index];

  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-3/4 m-1 px-4 space-y-4">
        <div className="py-2">
          <Typography variant="h2">{listing.title}</Typography>
        </div>

        <div
          className="h-2/5 bg-center bg-cover"
          style={{ backgroundImage: "url(" + listing.imageURL + ")" }}
        ></div>

        <div>
          <Typography className="pt-4" variant="h4">
            Beskrivelse
          </Typography>
          <Typography variant="body1">{listing.description}</Typography>
        </div>

        <Typography className="flex justify-end" variant="h3">
          Pris {listing.price}kr
        </Typography>
      </div>

      <div className="m-1 pl-4 border-l-2 border-gray-300 ">
        <Typography className="pb-6" variant="h2">
          Kontakt
        </Typography>

        <Typography className="p4-6" variant="h5" gutterBottom>
          Navn:
          <Typography variant="h6">{listing.name}</Typography>
          <hr />
        </Typography>

        <Typography className="py-4" variant="h5" gutterBottom>
          E-post:
          <Typography variant="h6">{listing.email}</Typography>
          <hr />
        </Typography>

        <Typography className="py-4" variant="h5" gutterBottom>
          Telefonnummer:
          <Typography variant="h6">{listing.phone}</Typography>
          <hr />
        </Typography>
      </div>
    </div>
  );
};

export default ViewListing;
