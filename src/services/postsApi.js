import axios from "axios";

const BASE_URL = "https://linked-posts.routemisr.com";

export async function getAllPosts(token) {
  const { data } = await axios.get(`${BASE_URL}/posts`, {
    headers: {
      token,
    },
    params: {
      limit: 50,
      sort: "-createdAt",
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
  const { data } = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
    headers: {
      token,
    },
  });

  return data;
}

export async function createNewPost(token, formData) {
  const { data } = await axios.post(`${BASE_URL}/posts`, formData, {
    headers: {
      token,
    },
  });

  console.log(data);

  return data;
}

export async function deletePost(token, postId) {
  const { data } = await axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: {
      token,
    },
  });

  console.log(data);

  return data;
}

export async function createComment(token, comment) {
  console.log(comment);
  const { data } = await axios.post(`${BASE_URL}/comments`, comment, {
    headers: {
      token,
    },
  });

  console.log(data);

  // return data;
}
