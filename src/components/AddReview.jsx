import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function AddReview({ shop }) {
  const [selectedFruit, setSelectedFruit] = useState("");
  const [review, setReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);

  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const { user } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const newReview = {
      fruit: selectedFruit,
      body: review,
      rating: ratingValue,
      store_id: shop.id,
      uid: user.uid,
    };

    fetch(`https://limebuyer2025-be.onrender.com/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("reviewing failed");
        }
        return res.json();
      })
      .then(() => {
        alert("review saved");
      })
      .catch((error) => {
        console.error(error);
        alert("error saving review");
      });
  }
  return isReviewFormVisible ? (
    <>
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Review:
          <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review here" />
        </label>
        <label>
          Fruit:
          <select value={selectedFruit} onChange={(e) => setSelectedFruit(e.target.value)} required>
            <option value="">Select a fruit</option>
            <option value="Lime">Lime</option>
            <option value="Lemon">Lemon</option>
            <option value="Mandarins">Mandarins</option>
            <option value="Grapefruit">Grapefruit</option>
          </select>
        </label>
        <label>
          Rating:
          <select value={ratingValue} onChange={(e) => setRatingValue(Number(e.target.value))}>
            <option value={0}>Select rating</option>
            <option value={1}>1 - Tesco-Tier</option>
            <option value={2}>2 - Edible</option>
            <option value={3}>3 - Mild-Zest</option>
            <option value={4}>4 - Juicyyy</option>
            <option value={5}>5 - LimeBuyer Certified</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={(e) => {
          setIsReviewFormVisible(false);
          e.stopPropagation();
        }}
        style={{ marginTop: "0.5rem" }}
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsReviewFormVisible(true);
        }}
        style={{ marginTop: "0.5rem" }}
      >
        Write a review
      </button>
    </>
  );
}

export default AddReview;
