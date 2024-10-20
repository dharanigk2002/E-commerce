import { useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useShop();
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");
  const [product, setProduct] = useState(null);
  useEffect(() => {
    setProduct(products.find((item) => item._id === productId));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [products, productId, product]);
  if (!product) return null;
  return (
    <div className="border-t-2 pt-10 opacity-100 ease-in transition-opacity duration-500">
      <div className="flex flex-col gap-12 sm:flex-row">
        <div className="flex flex-col-reverse gap-3 flex-1 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((item, index) => (
              <img
                key={index}
                src={item}
                className="w-[24%] sm:w-full mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            {
              <img
                src={image || product.image.at(0)}
                className="h-auto w-full"
                alt={product.name}
              />
            }
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img
              src={assets.star_dull_icon}
              alt="star-icon"
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="font-medium text-3xl mt-5">
            {currency}
            {product.price}
          </p>
          <p className="text-gray-500 mt-5 md:w-4/5">{product.description}</p>
          <div className="flex flex-col my-8 gap-4">
            <p>Select size</p>
            <div className="flex gap-2">
              {product.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border ${
                    item === size ? "border-orange-500" : ""
                  } py-2 px-4 bg-gray-100`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(product._id, size)}
            className="transition-opacity duration-500 hover:opacity-85 ease-in-out uppercase text-white bg-black active:bg-gray-700 py-3 px-8"
          >
            add to cart
          </button>
          <hr className="mt-8" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-r-0 text-sm px-5 py-3">Description</b>
          <p className="text-sm border px-5 py-3">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 text-sm px-6 py-6 text-gray-500">
          <p>
            An e-commerce website is one that allows people to buy and sell
            physical goods, services, and digital products over the internet
            rather than at a brick-and-mortar location.
          </p>
          <p>
            A great ecommerce website design is not only engaging and visually
            appealing, but it also effectively communicates the brand&apos;s
            products and services.
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
}

export default Product;
