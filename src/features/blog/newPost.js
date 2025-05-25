import { API_URL, accessToken, apiKey } from "src/config/apiConfig.js";

const createFormElement = document.querySelector("#js-create-form");
const createBtn = document.querySelector("#js-create-btn");

createBtn.addEventListener("click", async function () {
  const formData = new FormData(createFormElement);
  const newPost = {
    title: formData.get("title"),
    tag: formData.get("tag"),
    image: formData.get("image"),
    content: formData.get("content"),
  };

  try {
    const token = localStorage.getItem("accessToken") || accessToken;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
      body: JSON.stringify(newPost),
    };

    const response = await fetch(API_URL, options);
    if (!response.ok) {
      if (response.status === 401) {
        alert("Unauthorized: Yor access token may have expired");
      } else if (response.status === 403) {
        alert("Forbidden: Check your API key");
      } else {
        alert("Error accured while creating new post");
      }
      return;
    }

    await response.json();

    alert("Blog post created successfully!");
    await getPosts(); //refresh posts
    window.location.href = "index.html"; //navigates back to home page
  } catch (error) {
    console.error("Error creating post:", error?.message);
    alert("There was an error creating the post. Try again later.");
  }
});
