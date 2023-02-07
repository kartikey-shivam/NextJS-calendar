import Navbar from "@/Components/Navbar";
import React from "react";

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps): JSX.Element {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
