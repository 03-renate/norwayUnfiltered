//This code is responsible for the footer of the application.
//It's duplicated code from header.js file.

addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("js-footer");
  if (!footer) {
    alert("Element with ID js-footer not found in DOM!");
    return;
  }

  footer.appendChild(createFooter());
});

function createFooter() {
  const footer = document.createElement("footer");
  footer.id = "footer";
  footer.className = "footer";
  footer.innerHTML = `
            <div class="footer-links">
                <div>
                    <h5>company</h5>
                    <ul>
                        <li>
                            <a href="#">about us</a>
                        </li>
                        <li>
                            <a href="#">contact us</a>
                        </li>
                        <li>
                            <a href="#">careers</a>
                        </li>
                        <li>
                            <a href="#">our team</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h5>categories</h5>
                    <ul>
                        <li>
                            <a href="#">spring</a>
                        </li>
                        <li>
                            <a href="#">summer</a>
                        </li>
                        <li>
                            <a href="#">autumn</a>
                        </li>
                        <li>
                            <a href="#">winter</a>
                        </li>
                    </ul>
                </div>
            
                <div>
                    <h5>legal</h5>
                    <ul>
                        <li>
                            <a href="#">privacy policy</a>
                        </li>
                        <li>
                            <a href="#">terms of use</a>
                        </li>
                        <li>
                            <a href="#">cookie policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </article>

      <hr>

      <article>
        <h6>© 2025 NorwayUnfiltered. All rights reserved.</h6>
      </article>`;

  return footer;
}
