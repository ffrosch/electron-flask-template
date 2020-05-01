// ------------------------------------------------------------------------ //
// ---------------------------- Import Modules ---------------------------- //
// ------------------------------------------------------------------------ //

// Import electron
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create a native browser window.
const BrowserWindow = electron.BrowserWindow
// Module to define keyboard-shortcuts
const globalShortcut = electron.globalShortcut
// Module to work with filesystem paths
const path = require('path')


// ------------------------------------------------------------------------ //
// ---------------------- Define important Variables ---------------------- //
// ------------------------------------------------------------------------ //

// Keep a global reference of the mainWindowdow object, if you don't, the mainWindowdow will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

// Keep a global reference of the Python Subprocess
let subpy = null

// Only load the webapp-index-page after the Python Subprocess is initialised
var subpyInit = {'finished': false}
var subpyInitProxy = new Proxy(subpyInit, {
  set: function (target, key, value) {
    target[key] = value
    if (mainWindow !== null) {
      mainWindow.loadURL('http://localhost:5000/')
    }
  }
})

// Python Folders & Modules
// Path is relative to main.js
const PY_DIST_FOLDER = "../dist/app"; // python distributable folder
const PY_SRC_FOLDER = "../app"; // path to the python source
const PY_MODULE = "app.py"; // the name of the main module

// Check whether to use a bundled or unbundled Python App
// e.g. production vs. development
const isRunningInBundle = function () {
  return require("fs").existsSync(path.join(__dirname, PY_DIST_FOLDER))
}

const getPythonScriptPath = function () {
  if (!isRunningInBundle()) {
    return path.join(__dirname, PY_SRC_FOLDER, PY_MODULE)
  }
  if (process.platform === "win32") {
    return path.join(
      __dirname,
      PY_DIST_FOLDER,
      PY_MODULE.slice(0, -3) + ".exe"
    )
  }
  return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE)
}


// ------------------------------------------------------------------------ //
// ----------------------- Define server functions ------------------------ //
// ------------------------------------------------------------------------ //

// Function to start the Python Subprocess
// and write it's output to console
const startPythonSubprocess = function () {
  let script = getPythonScriptPath()
  if (isRunningInBundle()) {
    subpy = require("child_process").execFile(script, [])
  } else {
    subpy = require("child_process").spawn("python", [script])
  }
  // On output through stdout let electron know
  // that the initialization is finished
  subpy.stdout.on('data', function(chunk) {
    console.log(`${chunk}`)
    subpyInitProxy.finished = true
  })
}

// Function to ensure Termination of the Python Subprocess
const killPythonSubprocesses = main_pid => {
  const python_script_name = path.basename(getPythonScriptPath())
  let cleanup_completed = false
  const psTree = require("ps-tree")
  psTree(main_pid, function(err, children) {
    let python_pids = children
      .filter(function(el) {
        return el.COMMAND == python_script_name
      })
      .map(function(p) {
        return p.PID
      })
    // kill all the spawned python processes
    python_pids.forEach(function(pid) {
      process.kill(pid)
    })
    subpy = null
    cleanup_completed = true
  })
  return new Promise(function(resolve, reject) {
    (function waitForSubProcessCleanup() {
      if (cleanup_completed) return resolve()
      setTimeout(waitForSubProcessCleanup, 30)
    })()
  })
}


// ------------------------------------------------------------------------ //
// ------------------- Start Electron Client Properties ------------------- //
// ------------------------------------------------------------------------ //
const createMainWindow = () => {
  // Create the browser mainWindow
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // transparent: true, // transparent header bar
    //icon: __dirname + "/icon.png",
    // fullscreen: true,
    // opacity:0.8,
    // darkTheme: true,
    // frame: false,
    resizeable: true,
    webPreferences: {
      // before initialization root folder is where the main.js is located
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  // Register Shortcuts to be able to refresh the window
	globalShortcut.register('f5', function() {
		console.log('f5 is pressed')
		mainWindow.reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		console.log('CommandOrControl+R is pressed')
		mainWindow.reload()
	})

  // Load the index page
  // Attention: after initialization the root folder
  // is where the package.json is located
  if (subpyInit['finished'] == true) {
    mainWindow.loadURL("http://localhost:5000/")
  } else {
    mainWindow.loadFile('./client/index.html')
  }
  
  // print app path
  console.log(`App Root Path: ${app.getAppPath()}`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the mainWindow is closed.
  mainWindow.on("closed", function() {
    // Dereference the mainWindow object
    mainWindow = null
  })
}


// ------------------------------------------------------------------------ //
// ---------------------- Start the Electron Client ----------------------- //
// ------------------------------------------------------------------------ //

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", function() {
  // start the backend server
  startPythonSubprocess()
  createMainWindow()
})

// disable menu
app.on("browser-window-created", function(e, window) {
  window.setMenu(null)
})

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    let main_process_pid = process.pid
    killPythonSubprocesses(main_process_pid).then(function () {
      app.quit()
    })
  }
})

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (subpy == null) {
    startPythonSubprocess()
  }
  if (win === null) {
    createWindow()
  }
})

app.on("quit", function() {
  // do some additional cleanup
})