import React from "react";
import rolling from "../../../public/rolling.svg";
import Image from "next/image";

const Spinner = () => {
  return (
    <div>
      <Image src={rolling} className="text-blue-700"  />
    </div>
  );
};

export default Spinner;
