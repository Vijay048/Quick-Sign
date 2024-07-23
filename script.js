const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontPicker = document.getElementById("fontPicker");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");


const ctx = canvas.getContext("2d");

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
})

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }
})

canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
})

canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 500);
})

fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'signature.png';

    link.href = canvas.toDataURL();

    link.click();
})


retrieveButton.addEventListener('click', () => {
    const savedSignature = localStorage.getItem('canvasContents');
    if (savedSignature) {
        const img = new Image();
        img.src = savedSignature;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    } else {
        alert('No saved signature found!');
    }
})
