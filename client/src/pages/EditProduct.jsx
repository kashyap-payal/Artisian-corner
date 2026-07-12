import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://artisian-corner-production.up.railway.app/api/products/${id}`
      );

      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setCategory(res.data.category);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://artisian-corner-production.up.railway.app/api/products/${id}`,
        {
          name,
          description,
          price,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Updated Successfully");

      navigate("/seller-dashboard");

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={updateProduct}
        className="space-y-4"
      >
        <input
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />

        <textarea
          className="w-full border p-3 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          className="w-full border p-3 rounded"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          className="w-full border p-3 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;