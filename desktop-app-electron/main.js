const os = require("os")
const path = require("path")
const fs = require("fs")

const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron")
const resizeImg = require("resize-img")

const isDev = process.env.NODE_ENV !== "production"
const isMac = process.platform === "darwin"

let mainWindow
let aboutWindow

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1600 : 800,
        height: 900,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    })
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"))
}

const menu = [
    {
        role: "fileMenu"
    }
]

const createAboutWindow = () => {
    aboutWindow = new BrowserWindow({
        title: "About Image Resizer",
        width: 300,
        height: 300
    })
    aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"))
}

app.whenReady().then(() => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

const resizeImage = async ({ imagePath, width, height, destination }) => {
    try {
        // Create new
        const newImageData = await resizeImg(fs.readFileSync(imagePath), {
            height: parseInt(height),
            width: parseInt(width)
        })
        const [baseName, extension] = path.basename(imagePath).split(".")
        const newName = baseName + "-resized." + extension
        const destinationExists = fs.existsSync(destination)
        if (! destinationExists) {
            fs.mkdirSync(destination)
        }
        fs.writeFileSync(path.join(destination, newName), newImageData)
        // Send success to renderer
        mainWindow.webContents.send("image:done")
        // Open Destination Folder
        shell.openPath(destination)
    } catch (err) {
        console.log("Error: ", err)
    }
}

// Respond to ipcRenderer resize
ipcMain.on("image:resize", (e, options) => {
    options.destination = path.join(os.homedir(), "tmp/imageresizer")
    resizeImage(options)
})

app.on("window-all-closed", () => isMac && app.quit())
