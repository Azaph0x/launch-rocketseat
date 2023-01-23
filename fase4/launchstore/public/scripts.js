const Mask = {
    apply(input, func) {
        setTimeout(() => {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g,"")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    },
    cpf_cnpj(value) {
        value = value.replace(/\D/g,"")
        if(value.length > 14) {
            value = value.slice(0, -1)
        }

        //check if cpnj
        if(value.length > 11) {
            //"11.222333444455"
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
             //11.222.333444455
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            //11.222.333/444455
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            // 11.222.333/4444-55
            value = value.replace(/(\d{4})(\d)/, "$1-$2")

        } else {
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
            //cpf
        }

        return value
    },
    cep(value) {
        value = value.replace(/\D/g,"")

        if(value.length > 8) {
            value = value.slice(0, -1)
        }
        value = value.replace(/(\d{5})(\d)/, "$1-$2")
        return value
    }
}

const PhotosUpload = {
    input: "",
    uploadLimit: 6,
    preview: document.querySelector('#photos-preview'),
    files: [],
    handleFileInput(event) {
        const { files: fileList} = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return 

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image() // <img>
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image);

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()

    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const {files: fileList } = input

        if(fileList.length > uploadLimit) { // verificacao ao adicionar as fotos de uma vez so
            alert(`Envie no maximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit) { // verificacao ao adicionar uma por uma
            alert(`Voce atingiu o limite maximo de fotos`)
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
      const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
      
      PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

      return dataTransfer.files;
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i');
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode //event.target = <i> || parent = div.photo
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1) // remove o index tirando apenas 1 elemento
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()

    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"')
            if(removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

const imageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(event) {
        const { target } = event

        imageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        imageGallery.highlight.src = target.src
        lightBox.image.src = target.src
    }
}

const lightBox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    button: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        lightBox.target.style.opacity = 1
        lightBox.target.style.top = 0
        lightBox.target.style.bottom = 0
        lightBox.button.style.top = 0
    },
    close() {
        lightBox.target.style.opacity = 0
        lightBox.target.style.top = '-100%'
        lightBox.target.style.bottom = "initial"
        lightBox.button.style.top = '-80px'
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearError(input)
        let results = Validate[func](input.value)
        input.value = results.value
        if(results.error) Validate.display(input, results.error)
    },
    display(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error')
        if(errorDiv) errorDiv.remove()
    },
    isEmail(value) {
        let error = null
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!value.match(mailFormat)) {
            error = "Email invalido"
        }
        return {
            error, value
        }
    },
    isCpfCnpj(value) {
        let error = null
        const cleanValue = value.replace(/\D/g, "")
        if(cleanValue.length > 11 && cleanValue.length !== 14) {
            error = "CNPJ incorreto"
        } else if(cleanValue.length < 12 && cleanValue.length !== 11) {
            error = "CPF incorreto"
        }
        return {
            error, 
            value
        }
    },
    isCep(value) {
        let error = null
        const cleanValue = value.replace(/\D/g, "")
        if(cleanValue.length !== 8) {
            error = "CEP invalido"
        }
        return {
            error,
            value
        }
    },
    allFields(e) {
        const items = document.querySelectorAll(' .item input, .item select, .item textarea')
        for(item of items) {
            if(item.value == "") {
                const message = document.createElement('div')
                message.classList.add('messages')
                message.classList.add('error')
                message.style.position = 'fixed'
                message.innerHTML = 'Todos os campos sao obrigatorios.'
                
                document.querySelector('body').append(message)

                e.preventDefault()
            }
        }
    }
}