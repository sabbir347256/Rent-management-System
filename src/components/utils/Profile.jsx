import { Star, Calendar, Mail, Phone, ShieldCheck, MapPin, BadgeCheck, LogOut, User } from 'lucide-react';
import { useForm } from "react-hook-form";

const Profile = () => {
  const userData = {
    fullName: "Sabbir Ahmmed",
    email: "sabbir@gmail.com",
    contactNo: "01734534510",
    nidNo: "9879234453459",
    profileImage:
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    isVerified: false,
    role: "USER",
    isActive: "ACTIVE",
  };

  const stats = [
    { label: "Bookings", value: "12", hasStar: false },
    { label: "Rating", value: "4.8", hasStar: true },
  ];

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.contactNo,
      location: "Dhaka, Bangladesh",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      <div className="w-full lg:w-1/3 xl:w-1/4">
        <div className="  rounded-[2.5rem] shadow-sm border border-gray-100 p-8 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={userData.profileImage}
                alt={userData.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            {userData.isVerified && (
              <div className="absolute bottom-1 right-1 bg-blue-500 p-1.5 rounded-full border-2 border-white text-white">
                <BadgeCheck size={16} />
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1B4332] mb-1 leading-tight">
              {userData.fullName}
            </h2>
            <p className="text-slate-400 text-sm mb-4">{userData.email}</p>

            <div className="inline-flex items-center gap-1.5 bg-[#F0F7F4] px-4 py-2 rounded-full border border-[#E2E8E4]">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-[#52796F] text-sm font-bold uppercase tracking-wider">
                {userData.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#FAF9F6] rounded-3xl p-5 flex flex-col items-center justify-center text-center border border-gray-50"
              >
                <div className="text-xl font-black text-[#1B4332] flex items-center gap-1">
                  {stat.value}
                  {stat.hasStar && <Star className="w-4 h-4 fill-[#1B4332]" />}
                </div>
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-100 transition-all border border-red-100">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 h-fit">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-black text-[#1B4332]">
              Account Details
            </h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">
              Update your personal information here
            </p>
          </div>
          <div
            className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tighter ${userData.isActive === "ACTIVE" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
          >
            {userData.isActive}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-[#1B4332] uppercase tracking-widest ml-1">
                <User size={14} /> Full Name
              </label>
              <input
                {...register("fullName")}
                className="w-full bg-[#FAF9F6] border-2 border-transparent rounded-2xl p-4 text-gray-700 font-semibold focus:bg-white focus:border-[#1B4332]/20 transition-all outline-none"
                type="text"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-[#1B4332] uppercase tracking-widest ml-1">
                <Mail size={14} /> Email Address
              </label>
              <input
                {...register("email")}
                className="w-full bg-[#FAF9F6] border-2 border-transparent rounded-2xl p-4 text-gray-700 font-semibold focus:bg-white focus:border-[#1B4332]/20 transition-all outline-none"
                type="email"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-[#1B4332] uppercase tracking-widest ml-1">
                <Phone size={14} /> Contact Number
              </label>
              <input
                {...register("phone")}
                className="w-full bg-[#FAF9F6] border-2 border-transparent rounded-2xl p-4 text-gray-700 font-semibold focus:bg-white focus:border-[#1B4332]/20 transition-all outline-none"
                type="tel"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-[#1B4332] uppercase tracking-widest ml-1">
                <ShieldCheck size={14} /> NID Number
              </label>
              <div className="relative">
                <input
                  defaultValue={userData.nidNo}
                  readOnly
                  className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 text-gray-400 font-semibold cursor-not-allowed outline-none"
                  type="text"
                />
                <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-black text-[#1B4332] uppercase tracking-widest ml-1">
                <MapPin size={14} /> Home Location
              </label>
              <input
                {...register("location")}
                className="w-full bg-[#FAF9F6] border-2 border-transparent rounded-2xl p-4 text-gray-700 font-semibold focus:bg-white focus:border-[#1B4332]/20 transition-all outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="submit"
              className="bg-[#24634B] hover:bg-[#1B4332] text-white font-black py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-100 transform hover:-translate-y-1 active:translate-y-0"
            >
              Update Profile
            </button>
            <button
              type="button"
              className="bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold py-4 px-8 rounded-2xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
