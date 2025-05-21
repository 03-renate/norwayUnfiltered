/*This code display the blog post page.
It is inspired from previous classes with Monde Sineke and taken from the js-project
*/

import { createHTML, clearNode } from "@/utils";
import { API_URL, accessToken, apiKey } from "@/config/apiConfig.js";

const containerElement = document.querySelector("#js-blog-details");
let id = null;

setup();

function setup() {
    if(!containerElement) {
        alert("Required elements are missing on this page. Please try again later.");
        return;
    } else{
        const parameterString = window.location.search;
        const searchParameters = new URLSearchParams(parameterString);
        id = searchParameters.get("id");

        fetchBlogDetails(id);
    }
}

//Function to fetch blog details
async function fetchBlogDetails(blogId) {
    try{
        if(!blogId) {
            throw new Error("Blog ID is missing.");
        }

        const response = await fetch(`${API_URL}/${blogId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": apiKey.data.key
            },
        });
        const {data} = await response.json();


        const template = detailsTemplate({
            title: data.title,
            imgUrl: data.media?.url,
            imgAlt: data.media?.alt,
            author: data.author?.name,
            content: data.body,
            id: data.id,
            tags: data.tags
        });

        const blogDetailsElement = createHTML(template);
        clearNode(containerElement);
        containerElement.appendChild(blogDetailsElement);
    }catch (error) {
        console.error("Error fetching blog details:", error?.message);
    }
}


//Function to create blog details template
function detailsTemplate({ title, imgUrl, imgAlt, author, content, tags}) {
    return `
        <div class="blog-details">
            <img class="post-blog-img" src="${imgUrl}" alt="${imgAlt}">

            <div class="blog-btns">
                <a href="index.html">
                    <button class="back-btn">
                        <i class="fa-solid fa-arrow-left"></i> go back
                    </button>
                </a>

                <a href="#">
                    <button class="share-btn">
                        <i class="fa-solid fa-share-nodes"></i> share
                    </button>
                </a>
            </div>

            <h1>${title}</h1>
            
            <div class="blog-subtitles">
                <p><i class="fa-solid fa-user-tie"></i> ${author}</p>
                <h6 class="item-tag">${tags}</h6>
            </div>

            <div class="blog-content">${content}</div>
        </div>
    `;
}