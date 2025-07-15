import { useEffect, useState } from "react";

function ReviewList({ reviews, loading }) {

  if (loading) return <p>Loading reviews</p>;

  if (!reviews.length) return <p>No reviews so far!</p>;
  return (
    <div className="review-list">
      <h4>Reviews</h4>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
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
