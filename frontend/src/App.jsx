import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={isAuth ? <Products /> : <Navigate to="/login" />} />
        <Route path="/add-product" element={isAuth ? <AddProduct /> : <Navigate to="/login" />} />
        <Route path="/edit-product/:id" element={isAuth ? <EditProduct /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
