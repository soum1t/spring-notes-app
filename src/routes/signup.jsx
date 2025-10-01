import { createFileRoute, redirect } from "@tanstack/react-router";
import SignupCard from "../components/signup";
import isAuthenticated from "../lib/isAuthenticated";

export const Route = createFileRoute("/signup")({
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
      <SignupCard />
    </div>
  );
}
