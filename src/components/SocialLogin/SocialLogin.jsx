import Swal from "sweetalert2";
import useAuthContext from "../../hooks/useAuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuthContext();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  const handleGoogle = () => {
    signInWithGoogle().then((result) => {
      console.log(result?.user);

      // set user entry to databse
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };
      axiosPublic.post("/users", userInfo).then((res) => console.log(res.data));
      // alert
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      // navigate
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <button onClick={handleGoogle} className="btn btn-secondary">
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
