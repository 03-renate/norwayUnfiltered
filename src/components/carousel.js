/* code is inspired from 
WebDevSimplified, link: https://www.youtube.com/watch?v=9HcxHDS2w1s 
CodingNepal, link: https://www.youtube.com/watch?v=LC9LkDXkn6k&list=PLpwngcHZlPae68z_mLFNfbJFIJVJ_Zcx2&index=16
Dudley Storey, link: https://codepen.io/dudleystorey/pen/DvZjLz
w3school, link: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow */

import { createHTML, clearNode } from "@/utils.js";
import { API_URL, accessToken, apiKey } from "@/config/apiConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
  const carousel = document.querySelector("#js-carousel");
  const slidesContainer = document.querySelector("#js-slides-container");
  const dotsContainer =
    document.querySelector(
      ".carousel-nav"
    ); /* convert to array to ensure iteration */
  const prevBtn = document.querySelector(
    "#js-carousel .carousel-arrow-btns.right"
  );
  const nextBtn = document.querySelector(
    "#js-carousel .carousel-arrow-btns.left"
  );

  if (!carousel || !slidesContainer || !dotsContainer || !prevBtn || !nextBtn) {
    console.error("Carousel elements are missing in the DOM.");
    return;
  }

  setupCarousel(slidesContainer, dotsContainer, prevBtn, nextBtn);
});

//Function to setup carousel
async function setupCarousel(slidesContainer, dotsContainer, prevBtn, nextBtn) {
  const posts = await fetchPosts();
  if (!posts.length) {
    alert("No posts available.");
    return;
  }

  renderCarousel(posts, slidesContainer, dotsContainer);
  setupNavigation(slidesContainer, dotsContainer, prevBtn, nextBtn);
}

//Function to fetch posts
async function fetchPosts() {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const response = await fetch(API_URL, options);
    if (!response.ok) {
      if (response.status === 401) {
        alert("Unauthorized access. Please check your API key.");
      } else if (response.status === 403) {
        alert("Forbidden access. Please check your API key permissions.");
      } else {
        alert(
          "An error occurred while fetching posts. Please try again later."
        );
      }
      return [];
    }

    const data = await response.json();
    return data.data.slice(0, 3); // limit to 3 posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("There was an error loading posts. Please try again later.");
    return [];
  }
}

//Function render caruosel
function renderCarousel(posts, slidesContainer, dotsContainer) {
  clearNode(slidesContainer);
  clearNode(dotsContainer);

  posts.forEach((post, index) => {
    const slideHTML = createSlideTemplate(post);
    const dotHTML = createDotTemplate(index);

    slidesContainer.append(createHTML(slideHTML));
    dotsContainer.append(createHTML(dotHTML));
  });
}

//Function to create slide
function createSlideTemplate({ title, author, media, tags, id }) {
  return `
        <div class="slide">
            <a href="/src/item.html?id=${id}" class="slide-img">
                <img src="${media?.url}" alt="${media?.alt || "Post image"}">
            </a>
            <div class="slide-info">
                <h2>${title}</h2>

                <div class="slide-info-author">
                    <p><i class="fa-solid fa-user-tie"></i> ${author?.name}</p>
                    <h6 class="item-tag">${tags}</h6>
                </div>

                <div class="item-actions">
                    <a href="post.html?id=${id}">
                        <button class="pri-btn">read more</button>
                    </a>
                </div>
            </div>
        </div>`;
}

//Function to create dot
function createDotTemplate(index) {
  return `<button class="carousel-nav ${
    index === 0 ? "active" : ""
  }"></button>`;
}

//Function for slide navigation
function setupNavigation(slidesContainer, dotsContainer, prevBtn, nextBtn) {
  let currentIndex = 0;
  const slides = Array.from(slidesContainer.querySelectorAll(".slide"));
  const dots = Array.from(dotsContainer.querySelectorAll(".carousel-nav"));

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  dotsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("carousel-nav")) {
      currentIndex = parseInt(event.target.dataset.index, 10);
      showSlide(currentIndex);
    }
  });

  showSlide(currentIndex);
}
