import { useReducer, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../App";

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "Men",
  subCategory: "Topwear",
  bestSeller: false,
  sizes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "input/name":
      return { ...state, name: action.payload };
    case "input/description":
      return { ...state, description: action.payload };
    case "input/price":
      return { ...state, price: action.payload };
    case "input/category":
      return { ...state, category: action.payload };
    case "input/subCategory":
      return { ...state, subCategory: action.payload };
    case "toggle/bestSeller":
      return { ...state, bestSeller: !state.bestSeller };
    case "input/sizes":
      if (state.sizes.includes(action.payload))
        return {
          ...state,
          sizes: state.sizes.filter((size) => size !== action.payload),
        };
      return { ...state, sizes: [...state.sizes, action.payload] };
    case "form/reset":
      return initialState;
    default:
      return state;
  }
}

function Add({ token }) {
  const [image, setImage] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, description, price, category, subCategory, bestSeller, sizes } =
    state;
  function uploadImage(img, pos) {
    setImage((prev) => ({ ...prev, [pos]: img }));
  }
  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const items in state) {
        if (items === "sizes")
          formData.append(items, JSON.stringify(state[items]));
        else formData.append(items, state[items]);
      }
      for (const images in image) formData.append(images, image[images]);
      const resp = await axios.post(
        BACKEND_URL + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );

      if (resp.data.success) {
        toast.success(resp.data.message);
        dispatch({ type: "form/reset" });
        setImage({});
      } else toast.error(resp.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }
  return (
    <form
      onSubmit={onSubmitHandler}
      encType="multipart/form-data"
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={
                !image["image1"]
                  ? assets.upload_area
                  : URL.createObjectURL(image["image1"])
              }
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files[0], "image1")}
              hidden
              id="image1"
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={
                !image["image2"]
                  ? assets.upload_area
                  : URL.createObjectURL(image["image2"])
              }
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files[0], "image2")}
              hidden
              id="image2"
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={
                !image["image3"]
                  ? assets.upload_area
                  : URL.createObjectURL(image["image3"])
              }
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files[0], "image3")}
              hidden
              id="image3"
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={
                !image["image4"]
                  ? assets.upload_area
                  : URL.createObjectURL(image["image4"])
              }
              alt="upload"
            />
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files[0], "image4")}
              hidden
              id="image4"
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <label className="mb-2 block select-none" htmlFor="product_name">
          Product name
        </label>
        <input
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Enter product name"
          id="product_name"
          value={name}
          onChange={(e) =>
            dispatch({ type: "input/name", payload: e.target.value })
          }
          required
        />
      </div>
      <div className="w-full">
        <label className="mb-2 block select-none" htmlFor="product_desc">
          Product description
        </label>
        <textarea
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Enter product description..."
          id="product_desc"
          required
          onChange={(e) =>
            dispatch({ type: "input/description", payload: e.target.value })
          }
          value={description}
        ></textarea>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <label htmlFor="prod_cat" className="mb-2 select-none">
            Product category
          </label>
          <select
            id="prod_cat"
            onChange={(e) =>
              dispatch({ type: "input/category", payload: e.target.value })
            }
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kid</option>
          </select>
        </div>
        <div>
          <label htmlFor="sub_cat" className="mb-2 select-none">
            Sub-category
          </label>
          <select
            onChange={(e) =>
              dispatch({ type: "input/subCategory", payload: e.target.value })
            }
            className="w-full px-3 py-2"
            value={subCategory}
            id="sub_cat"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="w-full">
          <label className="select-none block" htmlFor="product_price">
            Product price
          </label>
          <input
            type="number"
            className="max-w-[270px] px-3 py-2"
            placeholder={25}
            id="product_price"
            onChange={(e) =>
              dispatch({ type: "input/price", payload: e.target.value })
            }
            required
            value={price}
            min={1}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product sizes</p>
        <div className="flex gap-3">
          <div>
            <p
              onClick={() => dispatch({ type: "input/sizes", payload: "S" })}
              className={`${
                sizes.includes("S") ? "bg-pink-300" : ""
              } cursor-pointer px-3 py-1 bg-slate-200`}
            >
              S
            </p>
          </div>
          <div>
            <p
              onClick={() => dispatch({ type: "input/sizes", payload: "M" })}
              className={`${
                sizes.includes("M") ? "bg-pink-300" : ""
              } cursor-pointer px-3 py-1 bg-slate-200`}
            >
              M
            </p>
          </div>
          <div>
            <p
              onClick={() => dispatch({ type: "input/sizes", payload: "L" })}
              className={`${
                sizes.includes("L") ? "bg-pink-300" : ""
              } cursor-pointer px-3 py-1 bg-slate-200`}
            >
              L
            </p>
          </div>
          <div>
            <p
              onClick={() => dispatch({ type: "input/sizes", payload: "XL" })}
              className={`${
                sizes.includes("XL") ? "bg-pink-300" : ""
              } cursor-pointer px-3 py-1 bg-slate-200`}
            >
              XL
            </p>
          </div>
          <div>
            <p
              onClick={() => dispatch({ type: "input/sizes", payload: "XXL" })}
              className={`${
                sizes.includes("XXL") ? "bg-pink-300" : ""
              } cursor-pointer px-3 py-1 bg-slate-200`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) =>
            dispatch({ type: "toggle/bestSeller", payload: e.target.value })
          }
          type="checkbox"
          checked={bestSeller}
          id="bestseller"
        />
        <label className="cursor-pointer select-none" htmlFor="bestseller">
          Add to best seller
        </label>
      </div>
      <button className="w-28 py-3 mt-4 text-white bg-black">Add</button>
    </form>
  );
}

export default Add;
