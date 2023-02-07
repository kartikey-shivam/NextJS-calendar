import React from "react";
import { useState } from "react";
import ReactModal from "react-modal";
import { AddE } from "../../interface/index";
import ReactDatetimeClass from "react-datetime";
export default function AddEvent({ isOpen, onClose, onEventAdded }: AddE) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const onSubmit = (event: any) => {
    event.preventDefault();
    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };
  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <form className="flex w-full justify-between">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-fit my-5 mx-2 p-2"
        />
        <div>
          <label className="">Start Date</label>
          <ReactDatetimeClass
            value={start}
            onChange={(date: any) => setStart(date)}
          />
        </div>
        <div>
          <label>End Date</label>
          <ReactDatetimeClass
            value={end}
            onChange={(date: any) => setEnd(date)}
          />
        </div>
        <button
          onClick={onSubmit}
          className="h-fit my-5 mx-2 px-5 py-1 rounded:md bg-purple-500 hover:bg-purple-800 dark:bg-green-500 dark:hover:bg-green-800"
        >
          Add
        </button>
      </form>
    </div>
  );
}
