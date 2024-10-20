import { useShop } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { getTotalAmount, delivery_fee, currency } = useShop();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>
      <div className="flex flex-col text-sm gap-2 mt-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getTotalAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {getTotalAmount() > 0 ? delivery_fee + getTotalAmount() : 0}.00
          </b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
