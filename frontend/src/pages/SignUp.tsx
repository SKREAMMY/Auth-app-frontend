import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface formDataProps {
  userName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<formDataProps>({} as formDataProps);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data received ", data);
      if (!data.success) {
        setError(true);
      } else {
        setError(false);
      }
      navigate("/sign-in");
    } catch (err) {
      console.log("error ", err);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="userName"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>
          Have an account?
          <Link to="/sign-in">
            <span className="text-blue-500 p-4">sign in</span>
          </Link>
        </p>
      </div>
      <p className="text-red-500">{error && "Something went wrong"}</p>
    </div>
  );
}
