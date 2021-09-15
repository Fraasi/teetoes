const path = require('path')
const { app, BrowserWindow } = require('electron');
const { contextIsolated } = require('process');

require('electron-reload')(__dirname) // webpack watches changes in ./src/

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 670,
    height: 540,
    title: `Teetoes - text to speech - V${app.getVersion()}`,
    icon: path.join(__dirname, 'assets/icon-fraasi-32x32.png'),
    resizable: true,
    webPreferences: {
      nativeWindowOpen: true,
      // contextIsolated: false,
      nodeIntegration: false,
      // preload: path.join(app.getAppPath(), 'preload.js')
      allowRunningInsecureContent: false,
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.toggleDevTools()

  app.on('activate', () => {
    if (mainWindow === null) createWindow()
  })

})
