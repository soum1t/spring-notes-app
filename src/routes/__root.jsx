import * as React from "react";
import { Outlet, createRootRoute, useMatchRoute } from "@tanstack/react-router";
import Navbar from "../components/navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();

  const isSignup = matchRoute({ to: "/signup" });
  const isSignin = matchRoute({ to: "/signin" });

  if (isSignup || isSignin) {
    return (
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
