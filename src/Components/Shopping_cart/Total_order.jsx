import { Link } from "react-router-dom";
export function Total_order(props) {
  return (
    <div className="flex justify-between items-start w-full flex-col">
      <div className="w-full flex justify-between items-center text-md">
        <p>Total:</p>
        <p>{"S/" + 15 + ".00"}</p>
      </div>
    </div>
  );
}
