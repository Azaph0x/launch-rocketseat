const currentPage = location.pathname
const menuItems = document.querySelectorAll("header a")

for (item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function pagenate(selectedPage, totalPages) {
    let oldPage, pages = []

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        const firstAndLastPage = pages == 1 || currentPage == totalPages

        if(firstAndLastPage || pagesBeforeSelectedPage || pagesAfterSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }
            if(oldPage && currentPage - oldPage == 2) {
                pages.push(currentPage - 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const filter = pagination.dataset.filter;
const pages = pagenate(page, total)

let elements = ""

for(let page of pages) {
    if(String(page).includes("...")) {
        elements += `<span">${page}</span>`
    } else {
        if(filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
}

pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if(pagination) 
    createPagination(pagination)