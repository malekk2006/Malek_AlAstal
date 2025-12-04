// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Projects data - replace with your real projects and links
const projects = [
  {
    title: 'Network Penetration Lab',
    desc: 'Simulated penetration testing environment using Kali and Metasploit.',
    img: 'assets/project1.jpg',
    link: '#'
  },
  {
    title: 'Network Traffic Analyzer',
    desc: 'Python tool to parse pcap files and extract indicators.',
    img: 'assets/project2.jpg',
    link: '#'
  },
  {
    title: 'Intro to Cryptography',
    desc: 'Beginner series on cryptography fundamentals and public key systems.',
    img: 'assets/project3.jpg',
    link: '#'
  }
];

// Render projects dynamically
const projectsList = document.getElementById('projects-list');
if (projectsList) {
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div style="margin-top:auto;">
        <a class="btn" href="${p.link}">View</a>
      </div>
    `;
    projectsList.appendChild(card);
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle && menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '8px';
  }
});

// Theme toggle with preference saved
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
if (savedTheme === 'light') document.body.classList.add('light');
updateThemeIcon();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon();
});
function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
}

// Particle background using canvas for cyber effect
(function initParticles(){
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w,h,particles=[];
  function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight}
  window.addEventListener('resize', resize); resize();

  function createParticles(){
    particles = [];
    const count = Math.round((w*h)/90000);
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.6+0.6,
        vx: (Math.random()-0.5)*0.4,
        vy: (Math.random()-0.5)*0.4,
        hue: 180 + Math.random()*140
      });
    }
  }
  createParticles();
  window.addEventListener('resize', createParticles);

  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=w; if(p.x>w) p.x=0;
      if(p.y<0) p.y=h; if(p.y>h) p.y=0;
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0, `hsla(${p.hue},100%,60%,0.12)`);
      g.addColorStop(1, `hsla(${p.hue},100%,60%,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
