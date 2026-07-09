import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("image", image);

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/products/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(response.data.message);
    console.log(response.data);

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

  <input
    type="text"
    placeholder="Product Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <br /><br />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  ></textarea>

  <br /><br />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
  />

  <br /><br />

  <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />

  <br /><br />

  <input
    type="file"
    onChange={(e) => setImage(e.target.files[0])}
  />

  <br /><br />

  <button type="submit">Add Product</button>

</form>
    </div>
  );
}

export default AddProduct;