import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { submitSignup } from "../lib/axiosFetchCalls";
import { Link } from "@tanstack/react-router";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [alert, setAlert] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await submitSignup(email, password);
    console.log(data);
    setAlert(data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 480,
          border: "1px solid #e2e8f0",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 className="text-blue-600" style={{ margin: 0, fontSize: 28 }}>
            Create your account
          </h1>
          <p style={{ color: "#6b7280", marginTop: 8, fontSize: 14 }}>
            Join us to keep track of your notes effortlessly.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                autoComplete="email"
                className="rounded"
                required
                style={{
                  height: 40,
                  padding: "0 12px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                }}
              />
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                We’ll never share your Username.
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                  className="rounded"
                  style={{
                    flex: 1,
                    height: 40,
                    padding: "0 12px",
                    border: "1px solid #d1d5db",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="rounded"
                  style={{
                    height: 40,
                    width: 40,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #d1d5db",
                    background: "#f9fafb",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Use at least 6 characters.
              </span>
            </div>

            {alert?.status === "error" ? (
              <div
                role="alert"
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #fecaca",
                  background: "#fef2f2",
                  color: "#991b1b",
                }}
              >
                <strong style={{ fontWeight: 600 }}>Error:</strong>
                <span>{alert.message}</span>
              </div>
            ) : alert?.status === "success" ? (
              <div
                role="status"
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #bbf7d0",
                  background: "#ecfdf5",
                  color: "#065f46",
                }}
              >
                <span>
                  {alert.message}{" "}
                  <Link
                    to={"/signin"}
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            ) : null}

            <button
              type="submit"
              className="self-start w-full bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create account
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link to={"/signin"} className="text-blue-600 underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
