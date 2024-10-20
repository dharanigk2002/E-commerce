import { useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useShop } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const [payment, setPayment] = useState(2);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { delivery_fee, cart, token, getTotalAmount, products, dispatch } =
    useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    state: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const orderedItems = [];
      for (const item in cart)
        for (const items in cart[item])
          if (cart[item][items] > 0) {
            const itemInfo = products.find((product) => product._id === item);
            if (itemInfo) {
              itemInfo.size = items;
              itemInfo.quantity = cart[item][items];
              orderedItems.push(itemInfo);
            }
          }
      const orderData = {
        address: formData,
        amount: getTotalAmount() + delivery_fee,
        items: orderedItems,
      };

      switch (payment) {
        case 0:
          {
            const response = await axios.post(
              BACKEND_URL + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            const { session_url } = response.data;
            window.location.replace(session_url);
          }
          break;
        case 1: {
          const response = await axios.post(
            BACKEND_URL + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            dispatch({ type: "reset" });
            navigate("/orders");
          }
          break;
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t sm:pt-14"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            value={formData.firstName}
            required={true}
            name="firstName"
            onChange={onChangeHandler}
            className="border border-gray-300 w-full rounded px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            name="lastName"
            required
            onChange={onChangeHandler}
            className="border border-gray-300 w-full rounded px-3.5 py-1.5"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={formData.email}
          required
          name="email"
          onChange={onChangeHandler}
          className="border border-gray-300 w-full rounded px-3.5 py-1.5"
        />
        <input
          type="text"
          placeholder="Street"
          value={formData.street}
          required
          name="street"
          onChange={onChangeHandler}
          className="border border-gray-300 w-full rounded px-3.5 py-1.5"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            required
            value={formData.city}
            name="city"
            onChange={onChangeHandler}
            className="border border-gray-300 w-full rounded px-3.5 py-1.5"
          />
          <input
            type="text"
            required
            placeholder="State"
            value={formData.state}
            name="state"
            onChange={onChangeHandler}
            className="border border-gray-300 w-full rounded px-3.5 py-1.5"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Zip code"
            value={formData.zipcode}
            name="zipcode"
            required
            onChange={onChangeHandler}
            className="border border-gray-300 w-full rounded px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            name="country"
            required
            onChange={onChangeHandler}
            className="border border-gray-300 w-full rounded px-3.5 py-1.5"
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          value={formData.phone}
          name="phone"
          required
          onChange={(e) => onChangeHandler(e)}
          className="border ph border-gray-300 w-full rounded px-3.5 py-1.5"
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          {/* ---------------PAYMENT method selection--------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              className="flex items-center border gap-3 p-2 px-3 cursor-pointer"
              onClick={() => setPayment(0)}
            >
              <p
                className={`rounded-full w-3.5 aspect-square border ${
                  payment === 0 ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="stripe-logo"
                className="mx-4 h-5"
              />
            </div>

            <div
              className="flex items-center border gap-3 p-2 px-3 cursor-pointer"
              onClick={() => setPayment(1)}
            >
              <p
                className={`rounded-full w-3.5 aspect-square border ${
                  payment === 1 ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 font-medium text-sm uppercase">
                cash on delivery
              </p>
            </div>
          </div>
          <div className="text-end mt-8">
            <button className="uppercase bg-black text-sm px-16 py-3 text-white hover:opacity-85 transition-all ease-in-out active:bg-gray-800">
              place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
