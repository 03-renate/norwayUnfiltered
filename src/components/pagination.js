/*
Pagination - James Q Quick, link: https://www.youtube.com/watch?v=Ynp6Gdd3XVE
JS Classes - Bro Code, link: https://www.youtube.com/watch?v=U2vxAEiaVRY
JS Classes - freeCodeCamp, link: https://www.youtube.com/watch?v=2ZphE5HcQPQ
*/

export class Pagination {
    constructor(totalPosts, postsPerPage, onPageChange){
        this.totalPosts = totalPosts;
        this.postsPerPage = postsPerPage;
        this.onPageChange = onPageChange;
        this.currentPage = 1;
    }

    // calculate and return the total number of pages
    get totalPages() {
        return Math.ceil(this.totalPosts / this.postsPerPage); // divide total posts by posts per page and round up to the nearest whole number
    }

    // update the current page number and perform actions when the page changes
    setPage(page) {
        if (page < 1 || page > this.totalPages) {
            throw new Error("Page out of range");
        }
        this.currentPage = page;
        this.onPageChange(this.currentPage);
    }

    // display the pagination btn on the page
    renderPaginationControls(container){
        paginationElement.innerHTML = "";

        const totalPages = this.getTotalPages(); //get total number of pages

        //loop trough page numbers, from 1 to total pages
        for(let i = 1; i <= totalPages; i++){
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("pagination-button");

            if(i === this.currentPage){
                btn.classList.add("active");
            }

            btn.addEventListener("click", () => {
                this.setPage(i);
            });
            container.appendChild(btn);
        }
    }
}