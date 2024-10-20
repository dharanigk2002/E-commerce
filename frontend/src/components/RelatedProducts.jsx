import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function RelatedProducts({ category, subCategory }) {
  const { products } = useShop();
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (products.length) {
      const product = products
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory);
      setRelated(product.slice(0, 5));
    }
  }, [products, category, subCategory]);
  return (
    <div className="my-24">
      <div className="text-3xl text-center py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 md:grid-cols-4">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
