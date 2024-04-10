const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.height / 2;

ctx.translate(radius, radius); // Move the origin to the center

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    let grad;

    // Outer circle with gradient
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    grad = ctx.createLinearGradient(0, 0, 300, 0);
    grad.addColorStop(0, '#fe8c00'); // Gradient start
    grad.addColorStop(1, '#f83600'); // Gradient end
    ctx.fillStyle = grad;
    ctx.fill();

    // Inner circle
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    let ang, num;
    ctx.font = radius * 0.15 + "px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = 'white'; // Color of the numbers

    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Hour
    hour %= 12;
    hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07, '#FAD961'); // Hour hand with golden color

    // Minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07, '#F76B1C'); // Minute hand with orange color

    // Second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02, 'red'); // Second hand remains red for contrast
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

setInterval(drawClock, 1000); // Draw the clock every second
