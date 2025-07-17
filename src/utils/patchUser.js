export async function patchUser(uid, newUsername, newAvatar) {
  const response = await fetch(
    `https://limebuyer2025-be-fug6.onrender.com/api/users/${uid}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, avatar_url: newAvatar }),
    }
  );

  if (!response.ok) {
    throw new Error("failed to patch review");
  }

  return response.json();
}
