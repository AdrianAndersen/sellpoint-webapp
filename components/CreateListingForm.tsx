import { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

const CreateListingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [fileUpload, setFileUpload] = useState<File | undefined | null>(null);

  return (
    <div className="h-screen flex flex-col items-center">
      <Typography variant="h2">Ny annonse</Typography>

      <form className="w-1/2 p-4 flex flex-col">
        <TextField
          label="Title"
          variant="filled"
          margin="normal"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <TextField
          label="Description"
          variant="filled"
          margin="normal"
          multiline={true}
          rows={3}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <TextField
          type="number"
          label="Price"
          variant="filled"
          margin="normal"
          value={"" + price}
          onChange={(evt) => setPrice(parseInt(evt.target.value, 10))}
        />
        <div className="border border-transparent rounded p-2 my-4 flex flex-row justify-start space-x-4 bg-gray-100">
          <input
            className="hidden"
            id="file-upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(evt) => setFileUpload(evt.target.files?.item(0))}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" color="primary" component="span">
              Upload picture
            </Button>
          </label>
          <Typography variant="h6">
            {fileUpload?.name ?? "No file selected"}
          </Typography>
        </div>
        <div className="flex flex-row justify-end space-x-4 my-8">
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              alert(`Title: ${title}
Description: ${description}
Price: ${price}
Picture: ${fileUpload?.name}`)
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingForm;
