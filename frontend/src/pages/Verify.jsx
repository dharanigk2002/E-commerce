import { useNavigate, useSearchParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Verify() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const { token, dispatch } = useShop();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  async function verifyPayment() {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        dispatch({ type: "reset" });
        navigate("/orders");
      }
    } catch (error) {
      console.error(error.message);
      navigate("/cart");
    }
  }
  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>verify</div>;
}

export default Verify;
