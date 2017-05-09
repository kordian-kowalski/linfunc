var el_a_1 = document.getElementById('a_1');
var el_b_1 = document.getElementById('b_1');
var el_a_2 = document.getElementById('a_2');
var el_b_2 = document.getElementById('b_2');

var form_1 = document.getElementById('form_1');
var form_2 = document.getElementById('form_2');

var el_scale = document.getElementById('scale');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width, height;

var a_1, b_1;
var x0_1, y0_1;

var a_2, b_2;
var x0_2, y0_2;

var grid_scale = 20;

setInterval(update, 25);

function updForm() {
    form_1.innerHTML = a_1 + 'x + ' + b_1;
    form_2.innerHTML = a_2 + 'x + ' + b_2;
}

function calc(a, b, x) {
    return a * x + b;
}

function update() {
    width = canvas.width;
    height = canvas.height;
    a_1 = parseFloat(el_a_1.value);
    b_1 = parseFloat(el_b_1.value);
    a_2 = parseFloat(el_a_2.value);
    b_2 = parseFloat(el_b_2.value);
    x0_1 = -b_1 / a_1;
    y0_1 = calc(a_1, b_1, 0);
    x0_2 = -b_2 / a_2;
    y0_2 = calc(a_2, b_2, 0);
    grid_scale = parseFloat(el_scale.value);
    grid_scale = grid_scale * grid_scale;

    updForm();
    draw();
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, width / 2 + 0.5, height / 2 + 0.5);
    ctx.clearRect(-width / 2, -height / 2, width, height);
    drawGrid();
    drawFunc();
    drawPoints();
}

function drawGrid() {
    ctx.lineWidth = 1;

    if (grid_scale / 5 > 3) {
        ctx.beginPath();
        ctx.strokeStyle = '#DDD';

        for (var x = 0; x < width; x += grid_scale / 5) {
            ctx.moveTo(x, -height / 2);
            ctx.lineTo(x, height / 2);
            ctx.moveTo(-x, -height / 2);
            ctx.lineTo(-x, height / 2);
        }
        for (var y = 0; y < height; y += grid_scale / 5) {
            ctx.moveTo(-width / 2, y);
            ctx.lineTo(width / 2, y);
            ctx.moveTo(-width / 2, -y);
            ctx.lineTo(width / 2, -y);
        }
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = '#CCC';
    for (var x = 0; x < width; x += grid_scale) {
        ctx.moveTo(x, -height / 2);
        ctx.lineTo(x, height / 2);
        ctx.moveTo(-x, -height / 2);
        ctx.lineTo(-x, height / 2);
    }
    for (var y = 0; y < height; y += grid_scale) {
        ctx.moveTo(-width / 2, y);
        ctx.lineTo(width / 2, y);
        ctx.moveTo(-width / 2, -y);
        ctx.lineTo(width / 2, -y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#333';
    ctx.moveTo(-width / 2, 0);
    ctx.lineTo(width / 2, 0);
    ctx.moveTo(0, -height / 2);
    ctx.lineTo(0, height / 2);
    ctx.stroke();
}

function drawFunc() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#080';
    ctx.beginPath();
    ctx.moveTo(-width / 2, -calc(a_1, b_1, -width / 2 / grid_scale) * grid_scale);
    ctx.lineTo(width / 2, -calc(a_1, b_1, width / 2 / grid_scale) * grid_scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#008';
    ctx.moveTo(-width / 2, -calc(a_2, b_2, -width / 2 / grid_scale) * grid_scale);
    ctx.lineTo(width / 2, -calc(a_2, b_2, width / 2 / grid_scale) * grid_scale);
    ctx.stroke();
}

function drawPoints() {
    ctx.strokeStyle = '#008';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x0_1 * grid_scale, 0, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -y0_1 * grid_scale, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x0_2 * grid_scale, 0, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -y0_2 * grid_scale, 6, 0, Math.PI * 2);
    ctx.stroke();

    var cPointX = (b_1 - b_2)/(a_2 - a_1);
    var cPointY = calc(a_2, b_2, cPointX);

    ctx.beginPath();
    ctx.arc(cPointX * grid_scale, - cPointY * grid_scale, 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '18px sans-serif';
    ctx.fillText('y0:(0,' + (Math.round(y0_1 * 100) / 100) + ')', 10, -y0_1 * grid_scale + 4);
    ctx.fillText('x0:(' + (Math.round(x0_1 * 100) / 100) + ',0)', x0_1 * grid_scale + 10, 4);

    ctx.fillText('y0:(0,' + (Math.round(y0_2 * 100) / 100) + ')', 10, -y0_2 * grid_scale + 4);
    ctx.fillText('x0:(' + (Math.round(x0_2 * 100) / 100) + ',0)', x0_2 * grid_scale + 10, 4);

    ctx.fillText(
        'P:(' + (Math.round(cPointX * 100) / 100) + ',' + (Math.round(cPointY * 100) / 100) + ')',
        cPointX * grid_scale + 10,
        -cPointY * grid_scale + 6
    );

}