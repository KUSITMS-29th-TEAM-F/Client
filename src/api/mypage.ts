import { getTokenCookie } from "../actions/cookies";

export const fetchMyInfo = async () => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${import.meta.env.VITE_PUBLIC_SERVER_API_URL}/members/my-page`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
