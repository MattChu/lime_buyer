export async function removeReviewByID(review_id, uid) {
  const response = await fetch(
    `https://limebuyer2025-be-fug6.onrender.com/api/reviews/${review_id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({uid})
    }
  );

  if (!response.ok) {
    throw new Error("failed to delete review");
  }
}
