const { app, BrowserWindow } = require('electron')


function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: __dirname + '/bunelaicon.ico',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }

    })
    win.maximize()
    win.removeMenu()
    win.loadURL('http://localhost:3000/')

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})