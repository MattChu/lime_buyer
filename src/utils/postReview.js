export async function postReview() {
  const response = await fetch(
    `https://limebuyer2025-be-fug6.onrender.com/api/reviews`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    throw new Error("failed to create review");
  }

  return response.json();
}
