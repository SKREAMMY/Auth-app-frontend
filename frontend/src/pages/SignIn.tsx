import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

interface formDataProps {
  userName: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<formDataProps>({} as formDataProps);
  const { loading, error } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data received ", data);
      if (data.error && !data.success) {
        console.log("error is ", data.error);
        dispatch(signInFailure(data.error));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }

      // if (!data.success) {
      //   setError(true);
      // } else {
      //   setError(false);
      // }
    } catch (err) {
      console.log("error ", err);
      dispatch(signInFailure(err));
    }

    console.log("store data is ", loading, error);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>
          Don't an account?
          <Link to="/sign-up">
            <span className="text-blue-500 p-4">sign up</span>
          </Link>
        </p>
      </div>
      <p className="text-red-500">{error && "Something went wrong"}</p>
    </div>
  );
}
