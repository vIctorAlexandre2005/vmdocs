import { PacmanLoader } from "react-spinners";

export function Loader() {
  return (
    <div className="flex justify-center items-center">
      <PacmanLoader size={20} color="#4636f5" />
    </div>
  );
}
