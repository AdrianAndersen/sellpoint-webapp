import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Slideshow = ({ ads }: { ads: any[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setIndex((index + 1) % ads.length);
    }, 10000);

    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ads]);

  return (
    <div
      className="h-20 w-full bg-center bg-cover"
      style={{
        backgroundImage: ads[index]
          ? "url(" + ads[index].imageURL + ")"
          : "none",
      }}
      title={ads[index]?.title}
    >
      <Button
        color="secondary"
        onClick={() => {
          if (ads.length > 0) {
            ads.splice(index, 1);
            setIndex((index + 1) % ads.length);
          }
        }}
      >
        X
      </Button>
    </div>
  );
};

const AdvertisementSlideshow = () => {
  const { data, error } = useSWR("/api/advertisements", fetcher);

  if (error) return <div>Failed to load ads</div>;
  if (!data) return <div>Loading...</div>;

  return <Slideshow ads={data} />;
};

export default AdvertisementSlideshow;
