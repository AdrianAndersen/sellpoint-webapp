import Typography from "@material-ui/core/Typography";
import ListingOverview from "../components/ListingOverview";
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
      <ListingOverview></ListingOverview>
    </div>
  );
}
