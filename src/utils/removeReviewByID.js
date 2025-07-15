export async function postUser(review_id) {
  const response = await fetch(
    `https://limebuyer2025-be-fug6.onrender.com/reviews/${review_id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("failed to delete review");
  }
}
