import { useRef, useState } from "react";
import Button from "../inputs/Button";
import Input from "../inputs/Input";

const CreateListingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <form className="w-1/2 p-4 flex flex-col">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <Input
          type="number"
          placeholder="Price"
          value={"" + price}
          onChange={(evt) => setPrice(parseInt(evt.target.value, 10))}
        />
        <div className="border border-transparent rounded p-2 my-2 flex flex-row justify-start space-x-4 bg-white">
          <div>Choose a picture:</div>
          <input
            ref={fileUploadRef}
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="flex flex-row justify-end space-x-4">
          <Button type="button">Cancel</Button>
          <Button
            type="button"
            onClick={() =>
              alert(`Title: ${title}
Description: ${description}
Price: ${price}
Picture: ${fileUploadRef.current?.files}`)
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
