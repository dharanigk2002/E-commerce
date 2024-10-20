import { Navigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function ProtectedRoute({ children }) {
  const { token } = useShop();
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
