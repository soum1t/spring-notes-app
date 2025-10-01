import { createFileRoute, redirect } from "@tanstack/react-router";
import NoteDisplay from "../components/noteDisplay";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/globalAxios";
import isAuthenticated from "../lib/isAuthenticated";

export const Route = createFileRoute("/$dynamicRoute")({
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
  const { dynamicRoute } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["singleNote", dynamicRoute],
    queryFn: async () => {
      const res = await axiosInstance.get(`todo/${dynamicRoute}`);
      console.log(res.data);
      return res.data;
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

  return (
    <div className="max-w-4xl mx-auto">
      <NoteDisplay data={data} />
    </div>
  );
}
