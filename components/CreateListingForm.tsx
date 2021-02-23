import { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Link from "next/link";

const CreateListingForm = ({
  initialListing = null,
}: {
  initialListing?: any;
}) => {
  const [title, setTitle] = useState(initialListing?.title);
  const [description, setDescription] = useState(initialListing?.description);
  const [price, setPrice] = useState(initialListing?.price);
  const [fileUpload, setFileUpload] = useState<File | undefined | null>(
    initialListing?.fileUpload
  );

  return (
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
        <Link href="/">
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </Link>
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
  );
};

export default CreateListingForm;
