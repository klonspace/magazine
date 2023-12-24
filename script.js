var audio = document.querySelector("audio");


function playAudio() {
    audio.play()
}

var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d")
var img = document.querySelector("img")
sizeCanvas()
window.addEventListener("resize", sizeCanvas)

var xmastree = new Image();

xmastree.src = "/xmas.png";


var drawCanvas = document.createElement("canvas")
var drawContext = drawCanvas.getContext("2d")


drawCanvas.width = window.screen.width;
drawCanvas.height = window.screen.height;

function sizeCanvas() {
    var box = img.getBoundingClientRect()
    canvas.width = box.width
    canvas.height = box.height
}

// drawContext.fillStyle = "white"

// drawContext.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
canvas.addEventListener("mouseenter", startDraw)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseleave", endDraw)


var drawing = false;
var lastX = 0, lastY = 0;

function drawWrapping() {
    // context.fillStyle = "yellow"
    context.drawImage(wrappingPaper, 0, 0, canvas.width, canvas.height)
}
function startDraw(e) {
    drawing = true
    lastX = e.layerX;
    lastY = e.layerY;
    drawShape(e.layerX, e.layerY)
}
var xmassize = 40;
function drawShape(x, y) {

    // drawContext.fillStyle = "black"
    // drawContext.fillRect(x - 5, y - 5, 10, 10)

    drawContext.drawImage(xmastree, x - xmassize / 2, y - xmassize / 2, xmassize, xmassize)
}
function draw(e) {
    // console.log(e)
    if (drawing) {
        var dist = Math.sqrt(Math.pow(e.layerX - lastX, 2), Math.pow(e.layerY - lastY, 2));
        // console.log(dist)
        for (var i = 0; i < dist; i += 0.3) {
            drawShape(lastX + ((e.layerX - lastX) * i / dist), lastY + ((e.layerY - lastY) * i / dist))
        }

        drawShape(e.layerX, e.layerY)

        context.globalCompositeOperation = "source-over"
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(drawCanvas, 0, 0)

        context.globalCompositeOperation = "source-out"
        drawWrapping();

        lastX = e.layerX;
        lastY = e.layerY;
    }
}
function endDraw() {
    drawing = false;
}



var wrappingPaper = new Image()
wrappingPaper.onload = () => {
    drawWrapping()
}

wrappingPaper.src = "/cover2.jpg";




document.body.addEventListener("click", () => {
    if (audio.paused) {
        audio.play()
        audio.loop = true;
        document.querySelector("#message").style.visibility = "hidden"
        canvas.style.visibility = "visible"
        img.style.visibility = "visible"
    }
})

