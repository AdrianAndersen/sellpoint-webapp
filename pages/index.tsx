import Typography from "@material-ui/core/Typography";
export default function Home() {
  return (
    <div className="h-full">
      <div className="w-full h-1/5 bg-green-400 text-center">
        <Typography
          variant="h6"
          className="h-full flex flex-col justify-center"
        >
          Advertisement
        </Typography>
      </div>
      <div className="w-full h-4/5 bg-yellow-300 text-center">
        <Typography
          variant="h5"
          className="h-full flex flex-col justify-center"
        >
          Listings
        </Typography>
      </div>
    </div>
  );
}
