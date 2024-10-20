import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShopContext = createContext();
const initialValue = {
  search: "",
  showSearch: true,
  cartItems: {},
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function reducer(state, action) {
  switch (action.type) {
    case "search/input":
      return { ...state, search: action.payload };
    case "search/visibility":
      return { ...state, showSearch: !state.showSearch };
    case "cart/add":
      return { ...state, cartItems: action.payload };
    case "reset":
      return initialValue;
    default:
      return state;
  }
}

// eslint-disable-next-line react/prop-types
export default function ShopContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("token");
    return stored || "";
  });

  useEffect(() => {
    fetchProducts();
    token && getCart();
  }, [token]);
  const currency = "$";
  const delivery_fee = 10;
  async function addToCart(id, size) {
    const cart = { ...state.cartItems };
    if (!size) {
      toast.error("Select product size");
      return;
    }
    if (cart[id]) {
      if (cart[id][size]) cart[id][size]++;
      else cart[id][size] = 1;
    } else {
      cart[id] = {};
      cart[id][size] = 1;
    }
    dispatch({ type: "cart/add", payload: cart });
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/cart/add",
        { itemId: id, size },
        { headers: { token } }
      );
      if (response.data.success) toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function getCart() {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      state.cartItems = response.data.cart;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function fetchProducts() {
    try {
      const response = await fetch(BACKEND_URL + "/api/product/list");
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  async function updateCart(id, quantity, size) {
    const update = { ...state.cartItems };
    update[id][size] = +quantity;
    dispatch({ type: "cart/add", payload: update });
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/cart/update",
        { itemId: id, size, quantity },
        { headers: { token } }
      );
      if (response.data.success) toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  function getCartCount() {
    let count = 0;
    for (const items in state.cartItems)
      for (const item in state.cartItems[items])
        if (state.cartItems[items][item] > 0)
          count += +state.cartItems[items][item];
    return count;
  }

  function getTotalAmount() {
    let total = 0;
    for (const items in state.cartItems) {
      const productInfo = products.find((product) => product._id === items);
      for (const item in state.cartItems[items])
        if (state.cartItems[items][item] > 0)
          total += +state.cartItems[items][item] * productInfo.price;
    }
    return total;
  }

  const value = {
    products,
    currency,
    delivery_fee,
    search: state.search,
    showSearch: state.showSearch,
    dispatch,
    cart: state.cartItems,
    addToCart,
    getCartCount,
    updateCart,
    getTotalAmount,
    token,
    setToken,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("Invalid access of shop context");
  return context;
}
