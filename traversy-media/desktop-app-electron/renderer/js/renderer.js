const $form = document.querySelector("#img-form")
const $img = document.querySelector("#img")
const $outputPath = document.querySelector("#output-path")
const $fileName = document.querySelector("#filename")
const $heightInput = document.querySelector("#height")
const $widthInput = document.querySelector("#width")

const isFileImage = file => {
    if (! file) {
        console.log("No file provided")
        return false
    }
    acceptedImageTypes = ["image/gif", "image/png", "image/jpeg", "image/jpg"]
    const isAcceptable = acceptedImageTypes.includes(file["type"])
    return isAcceptable
}

const alertError = message => {
    toastify.toast({
        text: message,
        duration: 2500,
        close: false,
        style: {
            background: "red",
            color: "white",
            textAlign: "center"
        }
    })
}

const alertSuccess = message => {
    toastify.toast({
        text: message,
        duration: 2500,
        close: false,
        style: {
            background: "green",
            color: "white",
            textAlign: "center"
        }
    })
}

const loadImage = e => {
    const file =  e.target.files[0]
    if (! isFileImage(file)) {
        alertError("Please select an image")
        return
    }
    // Get original dimensions of the image loaded
    const $image = new Image()
    $image.src = URL.createObjectURL(file)
    $image.onload = function() {
        $widthInput.value = this.width
        $heightInput.value = this.height
    }
    $form.style.display = "block"
    $fileName.innerText = file.name
    $outputPath.innerText = path.join(os.homedir(), "imageresizer")
}

const sendImage = e => {
    e.preventDefault()
    if (! img.files[0]) {
        alertError("Please upload an image")
        return
    }
    const width = $widthInput.value
    const height = $heightInput.value
    if (width === ""  || height === "") {
        alertError("Please fill in height and width")
    }
    const imagePath = img.files[0].path
    // Send to main using ipcRenderer
    ipcRenderer.send("image:resize", { imagePath, width, height })
}

// Catch the image:done event
ipcRenderer.on("image:done", () => {
    alertSuccess(`Image resized to ${$widthInput.value} x ${$heightInput.value}`)
})

$img.addEventListener("change", e => loadImage(e))
$form.addEventListener("submit", e => sendImage(e))
