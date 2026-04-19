import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Sign Up Data:", data);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm">
              Join us today and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("fullName", { required: "Name is required" })}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border ${errors.fullName ? "border-red-500" : "border-slate-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                />
              </div>
            </div>

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
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border ${errors.password ? "border-red-500" : "border-slate-200"} rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 py-2">
              <input
                type="checkbox"
                className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-slate-500">
                I agree to the{" "}
                <span className="text-blue-600 font-bold">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-600 font-bold">Privacy Policy</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group transition-all"
            >
              Create Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button className="text-blue-600 font-bold hover:underline">
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
