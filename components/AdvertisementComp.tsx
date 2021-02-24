import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdComponent = () => {
  const { data: ads, error } = useSWR("/api/advertisements", fetcher);
  const [inc, setIncrement] = useState(0);
  console.log("Increment:", inc);
  useEffect(() => {
    if (ads === undefined || ads === null) return;

    const interval = setInterval(() => {
      console.log(!(ads === undefined || ads === null));
      const newInc = inc + 1;
      console.log("New inc:", newInc);
      setIncrement(newInc);
      console.log("Ads:", ads);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ads]);

  if (error) return <div>Failed to load ads</div>;
  if (!ads) return <div>Loading...</div>;

  console.log(ads.length);

  const handleClick = () => {
    console.log(ads.length);
    console.log(inc);

    if (ads.length === 1) {
      console.log("Cannot splice anymore");
      return 0;
    } else {
      ads.splice(inc, 1);
    }
  };

  return (
    <div
      className="h-20 w-full bg-center bg-cover"
      style={{ backgroundImage: "url(" + ads[inc].imageURL + ")" }}
    >
      <Button color="primary" onClick={handleClick}>
        X
      </Button>
    </div>
  );
};

export default AdComponent;
