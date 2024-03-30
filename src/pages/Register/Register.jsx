import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const { signUp, updateUserProfile } = useAuthContext();
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    // stop auto reload
    e.preventDefault();

    // get input field
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;

    // validation
    if (password.length < 6) {
      return setError("password must have 6 characters");
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
        password
      )
    ) {
      return setError(
        "password must have one uppercase, one special character, one number"
      );
    }

    // setup signUp with firebase
    signUp(email, password)
      .then((result) => {
        console.log(result.user);

        // set user entry to databse
        const userInfo = {
          name,
          email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            // update user profile
            updateUserProfile(name, photoUrl)
              .then(() => console.log("profile update successfully"))
              .catch((error) => console.log(error.message));

            // alert
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Register Successful",
              showConfirmButton: false,
              timer: 1500,
            });

            // navigate
            navigate(from, { replace: true });
          }
        });
      })
      .catch((error) => console.log(error.message));
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
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoUrl</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo Url"
                  className="input input-bordered"
                  required
                  name="photoUrl"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {error && <p className="text-red-400 font-bold">{error}</p>}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
            <SocialLogin />
            <div>
              Already register?{" "}
              <Link className="text-blue-400" to={"/login"}>
                login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
