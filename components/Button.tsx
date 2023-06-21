import { signOut } from "next-auth/react";
import React from "react";

interface Iprops {
  title: String;
  funtion: () => void;
}

const Button = (props: Iprops) => {
  return (
    <button
      onClick={props.funtion}
      type="button"
      className="rounded-full bg-[#59abef] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#59abef]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
      {props.title}
    </button>
  );
};

export default Button;
