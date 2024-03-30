import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthContext from "./useAuthContext";

const useCart = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const { data: carts = [], refetch } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [carts, refetch];
};

export default useCart;
