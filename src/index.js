import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

require('dotenv').config()

let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
    require('electron-context-menu')({
      prepend: params => [{
        label: 'Rainbow',
        visible: params.mediaType === 'image',
      }],
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

