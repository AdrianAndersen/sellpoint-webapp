import { Card, Typography } from "@material-ui/core";
import CreateListingForm from "../components/CreateListingForm";

const CreateListingPage = () => {
  return (
    <Card className="flex flex-col items-center">
      <Typography variant="h2">Ny annonse</Typography>
      <CreateListingForm />
    </Card>
  );
};

export default CreateListingPage;
