import axios from "axios";
import React, { useEffect, useState } from "react";
import InputBox from "../../Components/InputBox/index";

export default function Signup(): JSX.Element {
  const [form, setForm] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const handleChange = (key: string, value: string): void => {
    setForm({ ...form, [key]: value });
  };
  const onSubmit = async () => {
    console.log("clicked", form);
    const respond = await axios.post(
      "http://localhost:8000/user/register",
      form
    );
    console.log(respond, "respond");
  };
  console.log(form, "form");
  return (
    <div className="h-screen flex justify-center py-10">
      <div className="bg-gray-200 w-1/3 my-3 py-5 px-2 flex flex-col justify-between items-center rounded-md dark:bg-gray-800">
        <h1 className="w-full text-center text-2xl">Register User</h1>
        <InputBox label="Username" type="text" handleChange={handleChange} />
        <InputBox label="Email" type="email" handleChange={handleChange} />
        <InputBox
          label="Password"
          type="password"
          handleChange={handleChange}
        />
        {/* <InputBox
          label="Confirm Password"
          type="password"
          handleChange={handleChange}
        /> */}
        <a
          href="/calendar"
          onClick={onSubmit}
          className="bg-purple-500 text-center w-1/3 my-2 py-1 rounded-md hover:bg-purple-800 dark:bg-green-500 dark:hover:bg-green-800"
        >
          Register
        </a>
        <p>
          Already have an account?{" "}
          <a
            href="/signin"
            className="cursor-pointer hover:text-purple-500  dark:hover:text-green-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
