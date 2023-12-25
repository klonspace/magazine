var audio = document.querySelector("audio");


function playAudio() {
    audio.play()
}

var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d")
var img = new Image()



img.onload = () => {
    document.querySelector("#container").appendChild(img)

    window.addEventListener("resize", sizeCanvas)

    var xmastree = new Image();

    xmastree.src = "xmas.png";


    var drawCanvas = document.createElement("canvas")
    var drawContext = drawCanvas.getContext("2d")

    var w = 0;
    var h = 0;

    console.log(window.devicePixelRatio)

    drawCanvas.width = window.screen.width * window.devicePixelRatio;
    drawCanvas.height = window.screen.height * window.devicePixelRatio;

    drawContext.scale(window.devicePixelRatio, window.devicePixelRatio)

    var xoffset = 0
    var yoffset = 0
    function sizeCanvas() {



        var box = img.getBoundingClientRect()
        xoffset = box.left;
        yoffset = box.top
        w = box.width
        h = box.height
        canvas.width = w * window.devicePixelRatio;
        canvas.height = h * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio)
        drawWrapping()
    }

    canvas.addEventListener("mouseenter", startDraw)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseleave", endDraw)


    var drawing = false;
    var lastX = 0, lastY = 0;

    function drawWrapping() {
        // context.fillStyle = "yellow"
        context.globalCompositeOperation = "source-over"
        context.clearRect(0, 0, w, h)
        context.drawImage(drawCanvas, 0, 0, drawCanvas.width / window.devicePixelRatio, drawCanvas.height / window.devicePixelRatio)

        context.globalCompositeOperation = "source-out"
        context.drawImage(wrappingPaper, 0, 0, w, h)
    }
    function startDraw(e) {
        // alert("start")
        drawing = true
        var newx = e.clientX - xoffset;
        var newy = e.clientY - yoffset
        lastX = newx;
        lastY = newy;
        drawShape(newx, newy)
    }
    var xmassize = 40;
    function drawShape(x, y) {
        drawContext.drawImage(xmastree, x - xmassize / 2, y - xmassize / 2, xmassize, xmassize)
    }
    function draw(e) {
        var newx = e.clientX - xoffset;
        var newy = e.clientY - yoffset
        // console.log(e)
        if (drawing) {
            var dist = Math.sqrt(Math.pow(newx - lastX, 2), Math.pow(newy - lastY, 2));
            // console.log(dist)
            for (var i = 0; i < dist; i += 0.3) {
                drawShape(lastX + ((newx - lastX) * i / dist), lastY + ((newy - lastY) * i / dist))
            }

            drawShape(newx, newy)


            drawWrapping();

            lastX = newx;
            lastY = newy;
        }
    }
    function endDraw() {
        drawing = false;
    }



    var wrappingPaper = new Image()
    wrappingPaper.onload = () => {
        drawWrapping()
        document.querySelector("#message").innerHTML = "Click anywhere to start"
        document.body.addEventListener("click", () => {
            if (audio.paused) {
                document.title = "Merry Christmas"
                audio.play()
                audio.loop = true;
                document.querySelector("#message").style.visibility = "hidden"
                canvas.style.visibility = "visible"
                setTimeout(() => {
                    img.style.visibility = "visible"
                }, 100)
            }
        })
    }

    wrappingPaper.src = "cover2.jpg";


    sizeCanvas()
}

img.src = "no2.jpg"






