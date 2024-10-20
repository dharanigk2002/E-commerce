// import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { products, currency, cart, updateCart } = useShop();

  const navigate = useNavigate();
  const tempCart = [];
  for (const items in cart)
    for (const item in cart[items])
      tempCart.push({
        _id: items,
        size: item,
        quantity: cart[items][item],
      });
  const cartData = tempCart.filter((item) => item.quantity > 0);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      {cartData.length > 0 ? (
        <>
          <div>
            {cartData.map((item, index) => {
              const productData = products.find(
                (prod) => prod._id === item._id
              );
              if (item.quantity > 0)
                return (
                  <div
                    key={index}
                    className="border-t border-b py-4 grid text-gray-700 grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                  >
                    <div className="flex items-start gap-6">
                      <img
                        src={productData.image.at(0)}
                        className="w-16 sm:w-20"
                        alt={productData.name}
                      />
                      <div>
                        <p className="font-medium text-xs sm:text-lg">
                          {productData.name}
                        </p>
                        <div className="flex items-center mt-2 gap-5">
                          <p>
                            {currency}
                            {productData.price}
                          </p>
                          <p className="px-2 border sm:px-3 sm:py-1 bg-slate-50">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(e) =>
                        updateCart(item._id, e.target.value, item.size)
                      }
                    />
                    <img
                      src={assets.bin_icon}
                      alt="garbage"
                      className="w-4 sm:w-5 mr-4 cursor-pointer"
                      onClick={() => updateCart(item._id, 0, item.size)}
                    />
                  </div>
                );
            })}
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="uppercase active:bg-gray-600 transition-all duration-500 ease-in-out hover:opacity-80 bg-black text-white text-sm px-8 py-3 my-8"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center text-3xl">No items to display in cart</h1>
      )}
    </div>
  );
}

export default Cart;
