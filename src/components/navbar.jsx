import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/globalAxios";
import { LogOutIcon, SunIcon } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";

export default function Navbar() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/todo/me");
      return res.data;
    },
  });

  const LogOut = () => {
    sessionStorage.removeItem("jwt");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 blur-backdrop bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h1 className="font-bold text-xl">
            <Link to={"/"}>Notes</Link>
          </h1>
          <p className="text-gray-600">
            <Link to={"/create"}>create Note</Link>
          </p>
        </div>
        <div className="flex items-center gap-6">
          <SunIcon size={16} strokeWidth={3} />
          <p>Hi, {data}</p>
          <button
            className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-red-600 rounded cursor-pointer"
            onClick={() => LogOut()}
          >
            <p>logout</p>
            <LogOutIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}
