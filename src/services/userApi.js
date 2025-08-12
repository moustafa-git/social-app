import axios from "axios";

const BASE_URL = "https://linked-posts.routemisr.com";

export async function getUserData(token) {
  const { data } = await axios.get(`${BASE_URL}/users/profile-data`, {
    headers: {
      token,
    },
  });

  return data.user;
}
