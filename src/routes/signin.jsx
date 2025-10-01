import { createFileRoute, redirect } from "@tanstack/react-router";
import SigninCard from "../components/signin";
import isAuthenticated from "../lib/isAuthenticated";

export const Route = createFileRoute("/signin")({
  beforeLoad: async () => {
    if (await isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SigninCard />
    </div>
  );
}
