import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import axiosInstance from "../lib/globalAxios";
import isAuthenticated from "../lib/isAuthenticated";

export const Route = createFileRoute("/create")({
  beforeLoad: async () => {
    if (!(await isAuthenticated())) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("Sample Text");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting note:", { title, description });

    try {
      const response = await axiosInstance.post("/todo/add", {
        title,
        description,
      });
      console.log("Note created successfully:", response.data);
      router.navigate({ to: "/" });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4" data-color-mode={"light"}>
      <h1 className="text-3xl font-bold mb-4">Create Note</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 outline-blue-600"
        />
        <MDEditor height={300} value={description} onChange={setDescription} />
        <button
          type="submit"
          className="self-start bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
