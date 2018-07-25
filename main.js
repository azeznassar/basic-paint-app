const canvas = document.querySelector('#draw');
const clear = document.querySelector('#clear');
const colorInput = document.querySelector('#color');
const brushColorInput = document.querySelector('#colorBrush');
const rainbow = document.querySelector('#rainbow');
const range = document.querySelector('#slider');
const undo = document.querySelector('#undo');


const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = range.value;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 360;
let direction = true;
let isRainbow = false;

function draw(e) {
    if(!isDrawing) return;
    if(!document.getElementById('checkbox').checked) {
        ctx.strokeStyle = brushColorInput.value;
        ctx.lineWidth = range.value;
    } else {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

        if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
            direction = !direction;
        }
        if (direction) {
            ctx.lineWidth++;
        } else {
            ctx.lineWidth--;
        }
        rainbowEffect();
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function rainbowEffect() {
    isRainbow = true;
    hue++;
    if(hue >= 360) {
      hue = 0;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.background = '';
}

function changeBGColour() {
    let c = colorInput.value;
    canvas.style.background = c;
}

clear.addEventListener('click', clearCanvas);
color.addEventListener('change', changeBGColour);
rainbow.addEventListener('click', rainbowEffect);
checkbox.addEventListener('change', rainbowEffect);
