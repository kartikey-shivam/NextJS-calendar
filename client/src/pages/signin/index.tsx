import axios from "axios";
import React, { useEffect, useState } from "react";
import InputBox from "../../Components/InputBox/index";

export default function Signup(): JSX.Element {
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });
  const handleChange = (key: string, value: string): void => {
    setForm({ ...form, [key]: value });
  };
  const onSubmit = async () => {
    console.log("clicked", form);
    const respond = await axios.post("http://localhost:8000/user/login", form);
    console.log(respond, "respond");
  };
  console.log(form, "form");
  return (
    <div className="h-screen bg-gray-300 flex justify-center py-10 dark:bg-gray-900">
      <div className="bg-gray-200 w-1/3 my-5 py-5 px-2 flex flex-col justify-between rounded-md items-center dark:bg-gray-800">
        <h1 className="w-full text-center text-2xl">Login</h1>
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
          className="bg-purple-500 text-center rounded-md hover:bg-purple-800 dark:bg-green-500 w-1/3 my-2 py-1 dark:hover:bg-green-800 "
        >
          login
        </a>
        <p>
          Don't have an account?{" "}
          <a
            href="/signup"
            className="cursor-pointer hover:text-purple-500 dark:hover:text-green-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
