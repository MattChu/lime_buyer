function AddReview({handleSubmit, review, setReview, ratingValue, setRatingValue}) {
    return (
        <form className="review-form" onSubmit={handleSubmit}>
                <label>
                  Review:
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here"
                  />
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
    )
}

export default AddReview