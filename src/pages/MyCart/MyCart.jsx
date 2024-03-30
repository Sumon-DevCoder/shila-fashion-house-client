import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyCart = () => {
  const [carts, refetch] = useCart();
  const axiosPublic = useAxiosPublic();

  const price = carts.reduce((prev, current) => prev + current.price, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${item?.name} want to delete`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/carts/${item?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // alert
            Swal.fire({
              title: "Deleted!",
              text: `${item?.name} has been deleted`,
              icon: "success",
            });

            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between px-5 mt-4">
        <span className="text-lg font-bold">Item: {carts.length}</span>
        <span className="text-lg font-bold">
          Total Price : {parseInt(price)}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts?.map((item, index) => (
              <tr key={item?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.image} alt="product image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item?.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
