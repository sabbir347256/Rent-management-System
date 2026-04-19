import { ArrowRight, Lock, Mail } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { DiChrome } from "react-icons/di";
import { GiThunderBlade } from "react-icons/gi";
import { NavLink } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border ${errors.email ? "border-red-500" : "border-slate-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border ${errors.password ? "border-red-500" : "border-slate-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group transition-all"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors font-semibold text-slate-700">
              <BsGoogle className="w-5 h-5 text-red-500" /> Google
            </button>
            {/* <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors font-semibold text-slate-700">
              <GiThunderBlade className="w-5 h-5" /> GitHub
            </button> */}
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
           <NavLink to='/signup'>
             <button className="text-blue-600 font-bold hover:underline">
              Sign Up
            </button>
           </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
