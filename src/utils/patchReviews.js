export async function patchReview() {
  const response = await fetch(
    `https://limebuyer2025-be-fug6.onrender.com/api/reviews/${review_id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    throw new Error("failed to patch review");
  }

  return response.json();
}
