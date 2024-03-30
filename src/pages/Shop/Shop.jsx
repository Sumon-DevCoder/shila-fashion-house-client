import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ShopCard from "./ShopCard/ShopCard";

const Shop = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products?.map((product) => (
        <ShopCard key={product?._id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
