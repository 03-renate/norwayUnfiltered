/*This code display the blog post page.
It is inspired from previous classes with Monde Sineke
*/

import { API_REG_URL } from "src/config/apiConfig";

const formElement = document.querySelector("#js-signup-form");

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  //   confirm password:  // "password12345678"
  // email:  // "suer12631737@stud.noroff.no"
  // firstname:  // "John"
  // password:  // "password12345678"
  const data = Object.fromEntries(formData.entries());
  console.log("Form data:", data);

  const payload = {
    name: data.firstname,
    email: data.email,
    password: data.password,
  };

  try {
    const response = await fetch(`${API_REG_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    console.log("Registration successful:", result);
  } catch (error) {
    console.error("Error during registration:", error);
  }
});
