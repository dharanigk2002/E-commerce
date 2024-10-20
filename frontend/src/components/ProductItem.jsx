/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function ProductItem({ id, image, name, price }) {
  const { currency } = useShop();
  return (
    <Link to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="transition hover:scale-110 ease-in-out cursor-pointer"
          src={image.at(0)}
          alt={name}
        />
      </div>
      <p className="text-sm pt-3 pb-1">{name}</p>
      <p className="font-medium text-sm">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductItem;
