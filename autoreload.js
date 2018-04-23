const REFRESH_RATE = 1000

let files = {}
setInterval(() => checkFile(files), REFRESH_RATE)

function checkFile(files) {
    let file = 'main.js'
    fetch(file).then(r => r.text()).then((text) => {
        if (files[file] && files[file] !== text) {
            window.location.reload(true)
        } else {
            files[file] = text
        }
    })
}
