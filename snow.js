const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// 使うひらがな
const chars = ["ゆ","き","し","ん","…","　"];

// 雪の粒
class Snow {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 18 + 12;
    this.speed = Math.random() * 0.5 + 0.2;
    this.char = chars[Math.floor(Math.random() * chars.length)];
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height + 40) {
      this.reset();
    }
  }

  draw() {
    ctx.font = `${this.size}px serif`;
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fillText(this.char, this.x, this.y);
  }
}

// 数（軽め）
const snows = [];
const COUNT = Math.floor(window.innerWidth / 20);

for (let i = 0; i < COUNT; i++) {
  snows.push(new Snow());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const s of snows) {
    s.update();
    s.draw();
  }

  requestAnimationFrame(animate);
}

animate();
