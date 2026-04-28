import React, { useEffect, useState } from "react";
import {
  Star,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  BadgeCheck,
  LogOut,
  User,
  Camera,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/user/get-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();
        if (result.success) {
          setProfileData(result.data);
          reset({
            fullName: result.data.fullName,
            email: result.data.email,
            phone: result.data.contactNo,
            location: result.data.location || "Not Set",
          });
        }
      } catch (error) {
        toast.error("Failed to load profile",error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  console.log(profileData)

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Updating...");
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:5000/api/v1/user/update-profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        toast.success("Profile updated!", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Update failed", { id: loadingToast },error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-white p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-emerald-500 to-teal-600" />

              <div className="relative flex flex-col items-center mt-12">
                <div className="relative group">
                  <div className="w-36 h-36 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <img
                      src={
                        profileData?.profileImage
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-lg text-emerald-600 hover:scale-110 transition-transform">
                    <Camera size={20} />
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                    {profileData?.fullName}
                    {profileData?.isVerified && (
                      <BadgeCheck className="text-blue-500 fill-blue-50" />
                    )}
                  </h2>
                  <p className="text-emerald-600 font-bold tracking-wide uppercase text-xs mt-1 italic">
                    {profileData?.role} • {profileData?.isActive}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-10">
                  <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 text-center">
                    <p className="text-2xl font-black text-slate-800">12</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Bookings
                    </p>
                  </div>
                  <div className="rounded-lg p-6 border border-emerald-100 flex items-center justify-center">
                    <p className="font-black text-emerald-600/60 uppercase tracking-widest">
                      {profileData?.isActive}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-md p-8 md:p-14 shadow-xl shadow-slate-200/50 border border-white">
              <div className="mb-12">
                <h3 className="text-4xl font-bold text-slate-800 tracking-tight">
                  Personal Information
                </h3>
                <p className="text-slate-400 font-medium mt-2">
                  Manage your account identity and security settings
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {[
                    {
                      id: "fullName",
                      label: "Full Name",
                      icon: <User size={16} />,
                      type: "text",
                    },
                    {
                      id: "email",
                      label: "Email Address",
                      icon: <Mail size={16} />,
                      type: "email",
                    },
                    {
                      id: "phone",
                      label: "Phone Number",
                      icon: <Phone size={16} />,
                      type: "tel",
                    },
                  ].map((field) => (
                    <div key={field.id} className="group">
                      <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-emerald-500 transition-colors">
                        {field.icon} {field.label}
                      </label>
                      <input
                        {...register(field.id)}
                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-6 py-4 text-slate-700 font-bold focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                        type={field.type}
                      />
                    </div>
                  ))}

                  <div className="group">
                    <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                      <ShieldCheck size={16} /> NID (Locked)
                    </label>
                    <div className="relative">
                      <input
                        value={profileData?.nidNo}
                        readOnly
                        className="w-full bg-slate-100 border-2 border-transparent rounded-[1.5rem] px-6 py-4 text-slate-400 font-bold cursor-not-allowed outline-none"
                      />
                      <ShieldCheck
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"
                        size={20}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 group">
                    <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                      <MapPin size={16} /> Residential Address
                    </label>
                    <input
                      {...register("location")}
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-6 py-4 text-slate-700 font-bold focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 px-10 rounded-[2rem] shadow-lg shadow-emerald-200 transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-10 py-5 rounded-[2rem] bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
