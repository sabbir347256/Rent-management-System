import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("accessToken");
        toast.success("Logged out successfully!");
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 1000);
    };

    return logout;
};

export default useLogout;