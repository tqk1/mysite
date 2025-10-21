// Co‑MYAKU Generator JavaScript
// This simple script draws abstract versions of the Expo 2025 design system ID concepts
// on a 600 × 600 canvas. It is intended for non‑commercial personal use and is not
// affiliated with the Expo 2025 organisers.

// Setup form submission
const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const theme = document.getElementById('theme').value.trim();
  const idType = document.getElementById('idType').value;
  const color = document.getElementById('color').value;
  generateID(idType, color, theme);
});

// Create or clear the canvas and dispatch drawing based on type
function generateID(type, color, theme) {
  const container = document.getElementById('canvas-container');
  container.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  // white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Determine seed from theme for pseudo‑random variation
  const seed = stringToSeed(theme + type + color);
  const rand = mulberry32(seed);

  if (type === 'lives') {
    drawLives(ctx, canvas.width, canvas.height, color, rand);
  } else if (type === 'growth') {
    drawGrowth(ctx, canvas.width, canvas.height, color, rand);
  } else {
    drawEvolution(ctx, canvas.width, canvas.height, color, rand);
  }
}

// Draw the Lives stage: simple almost circular form with one eye
function drawLives(ctx, w, h, color, rand) {
  const cx = w / 2;
  const cy = h / 2;
  const base = Math.min(w, h) * 0.3;
  // Random slight distortion of ellipse axes
  const rx = base * (1 + (rand() - 0.5) * 0.2);
  const ry = base * (1 + (rand() - 0.5) * 0.2);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eye placement
  const eyeOffsetX = rx * 0.3;
  const eyeOffsetY = ry * 0.1;
  const direction = rand() < 0.5 ? -1 : 1;
  const eyeX = cx + direction * eyeOffsetX;
  const eyeY = cy + eyeOffsetY;
  // white sclera
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(eyeX, eyeY, rx * 0.4, ry * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  // blue pupil (瞳)
  ctx.fillStyle = '#0076CE';
  ctx.beginPath();
  ctx.ellipse(eyeX, eyeY, rx * 0.2, ry * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
}

// Draw the Growth stage: softly deformed droplet with one eye
function drawGrowth(ctx, w, h, color, rand) {
  const cx = w / 2;
  const cy = h / 2;
  const base = Math.min(w, h) * 0.28;
  ctx.fillStyle = color;
  ctx.beginPath();
  // create a bean/teardrop shape by combining two ellipses
  const offset = base * 0.6;
  const angle = (rand() - 0.5) * Math.PI / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  // rear bulb
  ctx.ellipse(-offset * 0.3, 0, base, base * 0.7, 0, 0, Math.PI * 2);
  // front bulb
  ctx.ellipse(offset * 0.3, -base * 0.2, base * 0.6, base * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // eye: smaller and nearer the front end
  const eyeX = cx + Math.cos(angle) * offset * 0.3 + Math.sin(angle) * base * 0.0;
  const eyeY = cy + Math.sin(angle) * offset * 0.3 - Math.cos(angle) * base * 0.2;
  const eyeSize = base * 0.25;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(eyeX, eyeY, eyeSize, eyeSize * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0076CE';
  ctx.beginPath();
  ctx.ellipse(eyeX, eyeY, eyeSize * 0.4, eyeSize * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
}

// Draw the Evolution stage: multi‑node organic chain with one eye at the tip
function drawEvolution(ctx, w, h, color, rand) {
  const segments = 3 + Math.floor(rand() * 2); // 3 or 4 segments
  const startX = w * 0.3;
  const startY = h * 0.5;
  let x = startX;
  let y = startY;
  let radius = Math.min(w, h) * 0.16;
  const dx = radius * 0.8;
  ctx.fillStyle = color;
  for (let i = 0; i < segments; i++) {
    const ry = radius * 0.8;
    ctx.beginPath();
    ctx.ellipse(x, y, radius, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    // update position along a curved path
    x += dx;
    y += Math.sin(i * 0.8 + rand() * 1.0) * radius * 0.5;
    radius *= 0.8;
  }
  // eye on the last node
  const eyeSize = radius * 1.2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(x - dx, y - Math.sin((segments - 1) * 0.8 + rand() * 1.0) * radius * 0.5, eyeSize, eyeSize * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0076CE';
  ctx.beginPath();
  ctx.ellipse(x - dx, y - Math.sin((segments - 1) * 0.8 + rand() * 1.0) * radius * 0.5, eyeSize * 0.4, eyeSize * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
}

// Pseudo‑random generator based on Mulberry32
function mulberry32(a) {
  return function () {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
// Convert a string to a seed integer
function stringToSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h;
}
