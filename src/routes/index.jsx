import { Box, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import isAuthenticated from "../lib/isAuthenticated";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/globalAxios";
import DisplayNotes from "../components/displayNotes";

export const Route = createFileRoute("/")({
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
  const { data, error, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await axiosInstance.get("todo/getAll");
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading)
    return (
      <div class="flex justify-center items-center h-screen">
        <svg
          class="mr-3 size-10 animate-spin border-2 border-blue-600 border-t-transparent rounded-full"
          viewBox="0 0 32 32"
        ></svg>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-xl">
          No notes found
        </div>
      )}
      {data.length > 0 && <DisplayNotes notes={data} />}
    </div>
  );
}
