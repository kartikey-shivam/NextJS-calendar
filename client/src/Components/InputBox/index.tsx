import React from "react";
import { Ibox } from "../../interface/index";

export default function InputBox({ label, type, handleChange }: Ibox) {
  return (
    <div className="w-full p-2 flex justify-between">
      <label>{label}</label>
      <input
        type={type}
        className="bg-gray-100 px-2 py-1 "
        onChange={(e) => {
          handleChange(label, e.target.value);
        }}
      />
    </div>
  );
}
