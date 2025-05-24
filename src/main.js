/*This code displays the 12 blog posts. 
It is inspired from previous classes with Monde Sineke and taken from the js-project
ByteByteGo, link https://www.youtube.com/watch?v=14K_a2kKTxU 
*/

import { createHTML, clearNode } from "src/utils.js";
import { API_URL, accessToken, apiKey } from "src/config/apiConfig.js";

const containerElement = document.querySelector("#js-posts");
const sortByElement = document.querySelector("#js-sort-by");
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

// FUNCTION - FETCHES AND DISPLAYS POSTS
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
    posts = responseData.data || responseData;
    renderPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("There was an error loading posts. Please try again later.");
  }
}

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

// FUNCTION - CREATING TEMPLATES FOR THE ITEMS
function itemTemplate({ title, imageURL, imageAlt, tag, id }) {
  const isAdmin = false; // Replace with actual admin check logic
  // Example: const isAdmin = localStorage.getItem("isAdmin") === "true";

  const editButton = `<div class="item-actions">
        <a href="newPost.html?id=${id}">
            <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i> edit</button>
        </a>
    </div>`;

  const deleteButton = `<div class="item-actions">
        <button class="del-btn"><i class="fa-solid fa-trash-can"></i> delete</button>
    </div>`;

  return `
    <article class="item-details">
        <div class="item-image">
            <a href="/src/item.html?id=${id}" class="item-link">
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

// EVENT LISTENER - SORTING PRODUCTS
sortByElement.addEventListener("change", (event) => {
  const val = event.target.value;

  switch (val) {
    case "all": // sorting products by price => low to high
      products.sort((a, b) => a.price - b.price);
      break;
    case "spr": // sorting products by price => high to low
      products.sort((a, b) => b.price - a.price);
      break;
    case "sum": // sorting products by recommendations => true to false
      products.sort((a, b) => b.favorite - a.favorite);
      break;
    case "aut": // sorting products by recommendations => true to false
      products.sort((a, b) => b.favorite - a.favorite);
      break;
    case "win": // sorting products by recommendations => true to false
      products.sort((a, b) => b.favorite - a.favorite);
      break;
    default:
      console.warn(`Unknown sort option: ${val}`);
  }

  renderProducts(products);
});
