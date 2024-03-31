import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosing_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosing_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    // upload image
    console.log(imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // product item
    const item = {
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description,
      image: data.image,
    };

    console.log("ppp", data.price);

    if (res.data.success) {
      axiosSecure.post("/products", item).then((res) => {
        if (res.data.insertedId) {
          // alert
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.name} is Added Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });

          // reset
          reset();
        }
      });
    }
  };

  return (
    <div>
      <section className="bg-yellow-400">
        <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8 border-2 w-full">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5 ">
            <div className="rounded-lg bg-gray-400 w-full p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-medium">Name</span>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <span className="font-medium">Category</span>
                    <select
                      {...register("category", { required: true })}
                      className="select w-full max-w-xs"
                    >
                      <option disabled defaultValue="default">
                        Select Category
                      </option>
                      <option value="dress">Dresses</option>
                      <option value="suits">Suits</option>
                      <option value="bags">Bags</option>
                      <option value="shoes">Shoes</option>
                      <option value="bottoms">Bottoms</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <span className="font-medium">Price</span>
                    <label className="sr-only" htmlFor="price">
                      Price
                    </label>
                    <input
                      {...register("price", { required: true })}
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Price"
                      type="number"
                      id="price"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-medium">Description</span>
                  <label className="sr-only" htmlFor="message">
                    description
                  </label>

                  <textarea
                    {...register("description", { required: true })}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="description"
                    rows="8"
                    id="message"
                  ></textarea>
                </div>

                <div className="flex  flex-col space-y-1">
                  <span className="font-medium">Upload Image</span>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="file-input w-full max-w-xs"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddItems;
