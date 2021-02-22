import { Typography } from "@material-ui/core";
import CreateListingForm from "../components/CreateListingForm";

const CreateListingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Typography variant="h2">Ny annonse</Typography>
      <CreateListingForm />
    </div>
  );
};

export default CreateListingPage;
