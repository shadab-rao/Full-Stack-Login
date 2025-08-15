import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/product/add", form);
    navigate("/products");
  };

  return (
    <div className="p-5">
      <div className="d-flex p-3 mb-5 justify-content-between">
        <button className="col-1 rounded" onClick={()=>navigate(-1)}>Back</button>
        <button className="col-2 rounded">Add Product</button>
      </div>
      <div className="w-50" style={{marginLeft:"20%"}}>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
