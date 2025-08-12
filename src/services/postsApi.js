import axios from "axios";

const BASE_URL = "https://linked-posts.routemisr.com";

export async function getAllPosts(token) {
  const { data } = await axios.get(`${BASE_URL}/posts?limit=50`, {
    headers: {
      token,
    },
  });

  return data.posts;
}

export async function getSinglePost(id, token) {
  const { data } = await axios.get(`${BASE_URL}/posts/${id}`, {
    headers: {
      token,
    },
  });

  return data.post;
}

export async function getUserPosts(userId, token) {
  const { data } = await axios.get(
    `${BASE_URL}/users/${userId}/posts?limit=2`,
    {
      headers: {
        token,
      },
    }
  );

  return data;
}
