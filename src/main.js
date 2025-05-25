/*This code displays the 12 blog posts.
It is inspired from previous classes with Monde Sineke and taken from the js-project
ByteByteGo, link: https://www.youtube.com/watch?v=14K_a2kKTxU 
Web Dev Simplified, link: https://www.youtube.com/watch?v=TlP5WIxVirU
*/

import { createHTML, clearNode } from "src/utils.js";
import { API_URL, accessToken, apiKey } from "src/config/apiConfig.js";

const containerElement = document.querySelector("#js-posts");
const sortByElement = document.querySelector("#js-sort-by");
const searchInput = document.querySelector("#js-search-input");
const createBtn = document.querySelector("#js-create-post");
let posts = [];

// CHECK IF containerElement EXIST IN THE DOM
if (!containerElement || !sortByElement) {
  alert("Required elements are missing on this page. Please try again later.");
} else {
  setup();
}

// FUNCTION - INITIALIZE THE APPLICATION SETUP
function setup() {
  getPosts();
}

// FUNCTION - PREPROCESS POSTS (i messed up the tags in my api. i created ["summer, spring"] instead of ["summer", "spring"], and i'm using this function to fix it)
function preprocessPosts(posts) {
  return posts.map((post) => ({
    ...post,
    tags: post.tags ? post.tags[0].split(",").map((tag) => tag.trim()) : [], // split tags and trim whitespace
  }));
}

// FETCHES AND DISPLAYS POSTS - START
async function getPosts() {
  try {
    const token = localStorage.getItem("accessToken") || accessToken;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const response = await fetch(API_URL, options);
    if (!response.ok) {
      if (response.status === 401) {
        alert("Unauthorized: Your access token may have expired.");
      } else if (response.status === 403) {
        alert("Forbidden: Check your API key or user permissions.");
      } else {
        alert(
          "An error occurred while fetching posts. Please try again later."
        );
      }
      return;
    }

    const responseData = await response.json();
    posts = preprocessPosts(responseData.data || responseData);
    renderPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("There was an error loading posts. Please try again later.");
  }
}
// FETCHES AND DISPLAYS POSTS - END

// FUNCTION - RENDER POSTS
function renderPosts(items) {
  clearNode(containerElement);

  items.forEach((item) => {
    const template = itemTemplate({
      title: item.title,
      imageURL: item.media?.url,
      imageAlt: item.media?.alt || "Post image",
      tag: item.tags,
      id: item.id,
    });

    const newElement = createHTML(template);
    containerElement.append(newElement);
  });
}

// CREATING TEMPLATES FOR THE POSTS - START
function itemTemplate({ title, imageURL, imageAlt, tag, id }) {
  const isAdmin = true;

  if (isAdmin) {
    createBtn.classList.remove("hidden");
  } else {
    createBtn.classList.add("hidden");
  }

  const editButton = `<div class="item-actions">
        <a href="updatePost.html?id=${id}">
            <button id="js-edit-btn" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i> edit</button>
        </a>
    </div>`;

  const deleteButton = `<div class="item-actions">
        <button class="del-btn"><i class="fa-solid fa-trash-can"></i> delete</button>
    </div>`;

  return `
    <article class="item-details">
        <div class="item-image">
            <a href="/src/post.html?id=${id}" class="item-link">
                <img src="${imageURL}" alt="${imageAlt}">
            </a>
        </div>

        <div class="item-info">
            <h4 class="item-title">${title}</h4>
            <h6 class="item-tag">${tag}</h6>
        </div>

        <div class="item-actions">
            <a href="post.html?id=${id}">
                <button class="pri-btn">read more</button>
            </a>

            ${isAdmin ? editButton : ""}
            ${isAdmin ? deleteButton : ""}
        </div>
    </article>`;
}
// CREATING TEMPLATES FOR THE POSTS - END

// FILTER BY TAGS - START
const tagMap = {
  all: "all",
  spr: "spring",
  sum: "summer",
  aut: "autumn",
  win: "winter",
};

// EVENT LISTENER - SORTING POSTS BY TAGS
sortByElement.addEventListener("change", (event) => {
  const val = event.target.value;
  let filteredPosts;

  if (!posts || posts.length === 0) {
    alert("No posts available to sort.", error?.message);
    return;
  }

  // Filter posts based on the selected tag
  switch (val) {
    case "all": // no sorting
      filteredPosts = posts;
      break;
    case "spr": // sorting by spring
    case "sum": // sorting by summer
    case "aut": // sorting by autumn
    case "win": // sorting by winter
      const tag = tagMap[val];
      filteredPosts = posts.filter(
        (post) => Array.isArray(post.tags) && post.tags.includes(tagMap[val])
      );
      break;
    default:
      filteredPosts = posts; // default
  }

  renderPosts(filteredPosts);
});
// FILTER BY TAGS - END

// SEARCH FUNCTIONALITY - START
searchInput.addEventListener("input", handleSearch);

// FUNCTION - HANDLE SEARCH INPUT
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    post.title.toLowerCase().includes(query) || //match title
      (post.body && post.body.toLowerCase().includes(query)) || //match body
      post.tags.some((tag) => tag.toLowerCase().includes(query)); //match tags
  });

  renderPosts(filteredPosts);
}
// SEARCH FUNCTIONALITY - END
