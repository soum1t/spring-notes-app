import { useState } from "react";
import { submitSignin } from "../lib/axiosFetchCalls";
import { Link, useRouter } from "@tanstack/react-router";

export default function SigninCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await submitSignin(email, password);
    if (data.status === "error") {
      setAlert({ status: "error", message: data.message });
    } else {
      sessionStorage.setItem("jwt", data.message);
      router.navigate({ to: "/" });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 w-full max-w-md">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label htmlFor="username">
            <span className="text-sm font-medium text-gray-700">Username</span>
            <input
              type="text"
              name="username"
              className="mt-0.5 w-full rounded border-gray-300 border sm:text-sm px-3 py-2 outline-blue-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="text"
              name="password"
              className="mt-0.5 w-full rounded border-gray-300 border sm:text-sm px-3 py-2 outline-blue-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {alert?.status === "error" ? (
            <div className="text-red-500 text-center bg-red-500/10 p-2 rounded">
              {alert.message}
            </div>
          ) : null}

          <div className="flex-row">
            <button
              type="submit"
              className="self-start w-full bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
            <p className="text-center mt-4">
              Dont have an account?{" "}
              <Link to={"/signup"}>
                <span className="text-blue-600 underline">Sign up</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
