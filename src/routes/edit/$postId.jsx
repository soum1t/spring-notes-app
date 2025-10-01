import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import axiosInstance from "../../lib/globalAxios";
import isAuthenticated from "../../lib/isAuthenticated";

export const Route = createFileRoute("/edit/$postId")({
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
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { postId } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["editNote", postId],
    queryFn: async () => {
      const res = await axiosInstance.get(`todo/${postId}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="mr-3 size-10 animate-spin border-2 border-blue-600 border-t-transparent rounded-full"
          viewBox="0 0 32 32"
        ></svg>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`todo/${postId}`, {
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
      <h1 className="text-3xl font-bold mb-4">Edit Note</h1>
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="self-start bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="self-start bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => router.navigate({ to: "/" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
