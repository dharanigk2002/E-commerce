import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../assets/assets";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function fetchAllOrders() {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/order/list",
        {},
        { headers: { token } }
      );
      setOrders(response.data.orders);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function updateOrder(e, orderId) {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h3>Order page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 border-2 items-start border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcel-icon" />
            <div>
              <div>
                {order.items.map((item, index) => (
                  <p key={index} className="py-0.5">
                    {item.name} X {item.quantity} <span>{item.size}</span>
                    {index === order.items.length - 1 ? "" : ", "}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div>
                <p>{`${order.address.street}, `}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">$ {order.amount}</p>
            <select
              className="p-2 font-semibold"
              onChange={(e) => updateOrder(e, order._id)}
              defaultValue={order.status}
            >
              <option value="Order Placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
