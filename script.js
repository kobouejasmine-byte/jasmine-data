const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 150;

// Création des particules
for(let i=0;i<particleCount;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*3+1,
    dx:(Math.random()-0.5)*1.5,
    dy:(Math.random()-0.5)*1.5
  });
}

// Animation
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i=0;i<particles.length;i++){
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle='rgba(0,255,255,0.7)';
    ctx.fill();

    // Lignes entre particules proches
    for(let j=i+1;j<particles.length;j++){
      let p2 = particles[j];
      let dist = Math.hypot(p.x-p2.x, p.y-p2.y);
      if(dist<120){
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.strokeStyle = `rgba(0,255,255,${1-dist/120})`;
        ctx.lineWidth=1;
        ctx.stroke();
      }
    }

    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  }

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
