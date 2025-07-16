function ReviewList({ reviews, loading }) {
  if (loading) return <p>Loading reviews</p>;

  if (!reviews.length) return <p>No reviews so far!</p>;
  return (
    <div className="review-list">
      <h4>Reviews</h4>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <div className="review-header">
              <img
                src={review.avatar_url || "https://via.placeholder.com/40"}
                alt={`${review.username}'s avatar`}
                className="avatar"
              />
              <div className="review-meta">
                <strong>{review.username}</strong>
                <small>{new Date(review.published).toLocaleDateString("en-GB")}</small>
              </div>
            </div>

            <p className="review-body">{review.body}</p>
            <em className="review-rating">
              🍋 {review.rating} / 5 {review.fruit}
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ReviewList;
