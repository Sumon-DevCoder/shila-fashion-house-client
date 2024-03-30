import { PropTypes } from "prop-types";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthContext from "../../../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";

const ShopCard = ({ product }) => {
  const { name, image, price, category, description, _id } = product || {};
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user?.email) {
      const cartItem = {
        name,
        image,
        price,
        category,
        description,
        productId: _id,
        email: user.email,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          // alert
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${name} added to Cart successfully`,
            showConfirmButton: false,
            timer: 1500,
          });

          refetch();
        }
      });
    } else {
      // alert
      Swal.fire({
        title: "You are not Logged In?",
        text: "Please login then add to carts",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt="product image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Category: {category}</p>
          <p>Price: ${price}</p>
          <p>About: ${description}</p>
          <div className="card-actions justify-end">
            <button onClick={handleAddToCart} className="btn btn-primary">
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ShopCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ShopCard;
