import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../Api";

export default function EditProduct() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/product/update/${id}`, form);
      navigate("/products");
    } catch {
      alert("Failed to update product");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
