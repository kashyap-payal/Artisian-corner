import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5000/api/products/${id}/review`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review Added Successfully");

      setComment("");
      setRating(5);

      fetchProduct();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add review"
      );
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <img
        src={product.image}
        alt={product.name}
        width="350"
      />

      <h1>{product.name}</h1>

      <h2>₹ {product.price}</h2>

      <p>{product.description}</p>

      <h3>Category: {product.category}</h3>

      <h3>Seller: {product.seller?.name}</h3>

      <hr />

      <h2>Add Review</h2>

      <form onSubmit={submitReview}>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <br />
        <br />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          cols="50"
        />

        <br />
        <br />

        <button type="submit">
          Submit Review
        </button>
      </form>

      <hr />

      <h2>Customer Reviews</h2>

      {product.reviews?.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        product.reviews?.map((review, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h4>{review.name}</h4>

            <p>⭐ {review.rating}/5</p>

            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductDetails;