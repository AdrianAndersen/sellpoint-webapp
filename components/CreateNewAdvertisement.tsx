import { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

const CreateNewAdvertisement = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [fileUpload, setFileUpload] = useState<File | undefined | null>(null);

  return (
    <div className="h-screen flex flex-col items-center">
      <Typography variant="h2">Ny reklame</Typography>

      <form className="w-1/2 p-4 flex flex-col">
        <TextField
          label="Title"
          variant="filled"
          margin="normal"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <TextField
          label="Link"
          variant="filled"
          margin="normal"
          multiline={true}
          rows={3}
          value={link}
          onChange={(evt) => setLink(evt.target.value)}
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
Description: ${link}
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

export default CreateNewAdvertisement;
