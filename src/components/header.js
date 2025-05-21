//This code is responsible for the header of the application. 
// It contains the logo and the navigation bar.

addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('js-nav');
    if(!navbar){
        alert('Element with ID js-nav not found in DOM!');
        return;
    }

    navbar.appendChild(createHeader());
});

function createHeader() {
    const nav = document.createElement('nav');
    nav.id = 'navbar';
    nav.className = 'nav';
    nav.innerHTML = `
        <a class="navlogo" href="index.html" aria-label="home page">
          <span class="logo-icon"><i class="fa-solid fa-comments"></i></span>
          <span><h3>norway</h3></span>
          <span class="logo-right-side"><h3>unfiltered</h3></span>
        </a>

        <ul>
          <li>
            <a href="login.html" aria-label="log in">
              <button class="sec-btn">log in</button>
            </a>
          </li>

          <li>
            <a href="signUp.html" aria-label="sign up new account">
              <button class="pri-btn">sign up</button>
            </a>
          </li>
        </ul>`;

      return nav;
}