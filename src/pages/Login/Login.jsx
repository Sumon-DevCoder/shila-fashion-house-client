import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);

    // setup login with firebase
    login(data.email, data.password)
      .then((result) => {
        console.log(result.user);

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
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />
                {errors.email && (
                  <span className="text-red-400 font-bold">
                    email is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
                {errors.password && (
                  <span className="text-red-400 font-bold">
                    password is required
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {error && <p className="text-red-400 font-bold">{error}</p>}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <SocialLogin />
            <div>
              don`t have register?{" "}
              <Link className="text-blue-400" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
