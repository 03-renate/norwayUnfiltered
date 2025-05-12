//This code is responsible for the footer of the application. 
// It contains the logo and the navigation bar.

addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('js-footer');
    if(!footer){
        alert('Element with ID js-footer not found in DOM!');
        return;
    }

    footer.appendChild(createFooter());
});

function createFooter() {
    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.className = 'footer';
    footer.innerHTML = `
        <article class="footer-container">
            <div class="footer-logos">
                <img src="src/assets/images/Logo_1.png" alt="logo-image">

                <div class="footer-social-media">
                    <ul>
                        <li>
                            <a href="#" aria-label="github"><i class="fa-brands fa-github"></i></a>
                        </li>
                        <li>
                            <a href="#" aria-label="bluesky"><i class="fa-brands fa-bluesky"></i></a>
                        </li>
                        <li>
                            <a href="#" aria-label="linkedin"><i class="fa-brands fa-linkedin-in"></i></a>
                        </li>
                    </ul>
                </div>
            </div>

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
                            <a href="#">design</a>
                        </li>
                        <li>
                            <a href="#">programming</a>
                        </li>
                        <li>
                            <a href="#">technology</a>
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
        <h6>© 2025 WaveLength. All rights reserved.</h6>
      </article>`;

      return footer;
}