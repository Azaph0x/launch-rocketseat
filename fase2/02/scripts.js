const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function() {
        const videoId = card.getAttribute('id')
        modalOverlay.classList.add('active') // adicionado um novo atributo no elemento
        modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}`
    })
}

document.querySelector('.close-modal').addEventListener("click", function() {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = '';
})
//o document e um elemento da dom, a dom e
// a modelagem do html na qual trata os elementos do html como objetos