import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async (query = "") => {
    const { data } = await API.get(`/product/get-list`, {
      params: { search, sort },
    });
    setProducts(data.results);
  };

  const deleteProduct = async (id) => {
    await API.delete(`/product/delete/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [search, sort]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchProducts(value);
  };

  return (
    <div className="p-4 mt-2">
      <h2>Your Products</h2>
      <div className="col-12 d-flex justify-content-between mb-4 mt-5">
        <button
          style={{ width: "150px" }}
          onClick={() => navigate("/add-product")}
          className="col-2"
        >
          Add Product
        </button>
        <button className="col-2" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      <div className="col-4 mb-2 d-flex gap-2">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="search here..."
        />
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
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
          {products.length > 0 ? (
            products.map((p) => (
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
            ))
          ) : (
            <td>No Data Found</td>
          )}
        </tbody>
      </table>
    </div>
  );
}
