/*code is inspired from 
WebDevSimplified, link: https://www.youtube.com/watch?v=9HcxHDS2w1s 
CodingNepal, link: https://www.youtube.com/watch?v=LC9LkDXkn6k&list=PLpwngcHZlPae68z_mLFNfbJFIJVJ_Zcx2&index=16
Dudley Storey, link: https://codepen.io/dudleystorey/pen/DvZjLz
w3school, link: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow
*/

document.addEventListener("DOMContentLoaded", () => {
    const slides = Array.from(document.querySelectorAll("#js-carousel .slide")); /* convert to array to ensure iteration */
    const dots = Array.from(document.querySelectorAll(".carousel-nav .carousel-indicator")); /* convert to array to ensure iteration */
    const prevBtn = document.querySelector("#js-carousel .carousel-arrow-btns.right");
    const nextBtn = document.querySelector("#js-carousel .carousel-arrow-btns.left");
    let currentIndex = 0;

    const showSlide = (index) => { /* update slides and dots synchronously */
        slides.forEach((slide,i) => {
            slide.classList.toggle("active", i === index)
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    };

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length; /* loop to end if at start */
            showSlide(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; /* loop to start if at end */
            showSlide(currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentIndex = i;
            showSlide(currentIndex);
        });
    });

    /* Initialize first slide */
    showSlide(currentIndex);
});