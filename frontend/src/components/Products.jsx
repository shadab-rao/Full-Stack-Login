import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data } = await API.get("/product/get-list");
    setProducts(data.data);
  };

  const deleteProduct = async (id) => {
    await API.delete(`/product/delete/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Your Products</h2>
      <button
        style={{ width: "150px" }}
        onClick={() => navigate("/add-product")}
      >
        Add Product
      </button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/edit-product/${p._id}`, {
                      state: { product: p },
                    })
                  }
                >
                  Edit
                </button>

                <button onClick={() => deleteProduct(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
