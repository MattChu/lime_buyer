export async function postUser(uid, username) {
  const response = await fetch(
    `https://limebuyer2025-be.onrender.com/api/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: uid, username: username }),
    }
  );

  if (!response.ok) {
    throw new Error("failed to create user");
  }

  return response.json();
}
