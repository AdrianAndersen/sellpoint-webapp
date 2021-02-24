import { Card, Typography } from "@material-ui/core";
import CreateNewAdvertisement from "../components/CreateNewAdvertisement";

const CreateAdvertisementPage = () => {
  return (
    <Card className="flex flex-col items-center">
      <Typography variant="h2">Ny reklame</Typography>
      <CreateNewAdvertisement />
    </Card>
  );
};

export default CreateAdvertisementPage;
