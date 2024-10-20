import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { products, search } = useShop();
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterProds, setFilterProds] = useState(() => products.slice(0, 8));
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    let productsCopy = [...products];
    if (search)
      productsCopy = productsCopy.filter((prod) =>
        prod.name.toLowerCase().includes(search.toLowerCase())
      );
    if (category.length)
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category.toUpperCase())
      );
    if (subCategory.length)
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    setFilterProds(
      productsCopy.sort((a, b) => +sortType * (a.price - b.price))
    );
  }, [category, subCategory, sortType, search, products]);

  function toggleCategory(e) {
    if (category.includes(e.target.value))
      setCategory(category.filter((item) => item !== e.target.value));
    else setCategory([...category, e.target.value]);
  }

  function toggleSubcategory(e) {
    const { value } = e.target;
    if (subCategory.includes(value))
      setSubCategory(subCategory.filter((item) => item !== value));
    else setSubCategory([...subCategory, value]);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          className="my-2 gap-2 flex items-center text-xl cursor-pointer"
          onClick={() => setShowFilter((filter) => !filter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdoen-icon"
            className={`h-3 transition-all sm:hidden ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>
        {/* Category filter */}
        <div
          className={`border sm:block pl-5 py-3 mt-6 border-gray-300 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="font-medium mb-3 text-sm">CATEGORIES</p>
          <div className="flex flex-col text-sm gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                id="MEN"
                onChange={toggleCategory}
                value="MEN"
              />
              <label htmlFor="MEN">Men</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                id="WOMEN"
                onChange={toggleCategory}
                value="WOMEN"
              />
              <label htmlFor="WOMEN">Women</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                id="KIDS"
                onChange={toggleCategory}
                value="KIDS"
              />
              <label htmlFor="KIDS">Kids</label>
            </p>
          </div>
        </div>
        {/* Sub-category filter */}
        <div
          className={`border pl-5 py-3 my-5 sm:block border-gray-300 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="font-medium mb-3 text-sm">TYPE</p>
          <div className="flex flex-col text-sm gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                id="topwear"
                value="Topwear"
                onChange={toggleSubcategory}
              />
              <label htmlFor="topwear">Top-wear</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                id="bottomwear"
                onChange={toggleSubcategory}
                value="Bottomwear"
              />
              <label htmlFor="bottomwear">Bottom-wear</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                id="winterwear"
                onChange={toggleSubcategory}
                value="Winterwear"
              />
              <label htmlFor="winterwear">Winter-wear</label>
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="0">Sort by: Relavent</option>
            <option value="1">Sort by: Low to high</option>
            <option value="-1">Sort by: High to low</option>
          </select>
        </div>
        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProds.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
