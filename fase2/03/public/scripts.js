const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function() {
        const videoId = card.getAttribute('id')
        window.location.href = `/video?id=${videoId}`
    })
}

//o document e um elemento da dom, a dom e
// a modelagem do html na qual trata os elementos do html como objetos