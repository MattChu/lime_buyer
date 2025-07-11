import { useEffect, useState } from "react";

function ReviewList({ markerId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!markerId) return;
    // ***MUST CHANGE ENDPOINT TO ACTUAL ENDPOINT WHEN AVAILABLE FROM BE***
    fetch(`https://limebuyer2025-be.onrender.com/api/reviews/${markerId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetching reviews failed");
        return res.json();
      })
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((err) => {
        console.error(err);
        setReviews([]);
      })
      .finally(() => setIsLoading(false));
  }, [markerId]);

  if (loading) return <p>Loading reviews</p>;

  if (!reviews.length) return <p>No reviews so far!</p>;
  // ***IMPORTANT NOTE*** Must change index to review_id with backend integration for key
  return (
    <div className="review-list">
      <h4>Reviews</h4>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            {console.log(review)}
            <div className="review-header">
              {review.avatar_url && <img src={review.avatar_url} alt="avatar missing" className="avatar" />}
              <strong>
                {" "}
                <br />
                {review.username}
              </strong>
            </div>

            <br />
            <span>{review.body}</span>
            <br />
            <em>{review.rating} / 5</em>
            <br />
            <small>{new Date(review.published).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ReviewList;
