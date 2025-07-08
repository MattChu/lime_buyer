import { useEffect, useState } from "react"

function ReviewList({ markerId }) {

    const [reviews, setReviews] = useState([])
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!markerId) return;
// ***MUST CHANGE ENDPOINT TO ACTUAL ENDPOINT WHEN AVAILABLE FROM BE***
        fetch(`/api/reviews/${markerId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Fetching reviews failed");
                return res.json()
            })
            .then((data) => {
                setReviews(data);
            })
            .catch((err) => {
                console.error(err)
                setReviews([{
                    userName: "Sample user",
                    reviewText: "Sample review text",
                    rating:3,
                }])
            })
            .finally(() => setIsLoading(false));
    }, [markerId])
    
    if(loading) return <p>Loading reviews</p>


    if (!reviews.length) return <p>No reviews so far!</p>

    return (
        <div className="review-list">
            <h4>Reviews</h4>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <strong>{review.userName}</strong>
                        <br />
                        <span>{review.reviewText}</span>
                        <br />
                        <em>{review.rating} / 5</em>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ReviewList