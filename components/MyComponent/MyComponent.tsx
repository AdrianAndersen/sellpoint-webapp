import HelperComponent from "./HelperComponent";
import { useState } from "react";

const MyComponent = ({ specialProp }: { specialProp: string }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto border-solid border-2 border-black p-5">
      <h1 className="text-3xl text-gray-800 font-bold">
        This is an example component
      </h1>
      <p className="mt-4 bg-red-400 p-4 rounded">{specialProp}</p>
      <HelperComponent />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Click me! (count: {count})
      </button>
    </div>
  );
};

export default MyComponent;
