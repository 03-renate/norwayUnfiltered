/*This code display the blog post page.
It is inspired from previous classes with Monde Sineke
*/

import { API_LOG_URL } from "src/config/apiConfig";

const formElement = document.querySelector("#js-login-form");
const validationElement = document.querySelector("#js-validation");

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());
  console.log("Form data:", data);

  try {
    const response = await fetch(`${API_LOG_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    localStorage.setItem(
      "accessToken",
      JSON.stringify(result.data.accessToken)
    );

    window.location.href = "/index.html";

    console.log("LogIn successful:", result);
  } catch (error) {
    console.error("Error during registration:", error);
    alert(
      "There was an error logging in. Please check your credentials and try again.",
      error?.message
    );
  }
});
