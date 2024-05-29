export const setTokenCookie = async (code: string) => {
  console.log("setTokenCookie", code);
  // cookies().set('access_token', code);
};

export const getTokenCookie = async () => {
  // const token = cookies().get('access_token')?.value;
  const token = null;

  if (!token) {
    return null;
  }

  return token;
};

export const deleteTokenCookie = () => {
  // cookies().delete("access_token");
};
