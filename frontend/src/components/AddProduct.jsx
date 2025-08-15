import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/product/add", form);
    navigate("/products");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="price" placeholder="Price" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
