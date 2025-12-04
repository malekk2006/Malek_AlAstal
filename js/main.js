// تهيئة عامة
document.getElementById('year').textContent = new Date().getFullYear();

// بيانات مشاريع افتراضية يمكن استبدالها
const projects = [
  {title:'مختبر اختراق شبكي', desc:'محاكاة بيئة لاختبار الاختراق باستخدام Kali وMetasploit', link:'#'},
  {title:'أداة تحليل حركة الشبكة', desc:'أداة بايثون لتحليل pcap واستخراج مؤشرات الاختراق', link:'#'},
  {title:'مقال تعليمي عن التشفير', desc:'سلسلة مبسطة عن أساسيات التشفير والمفاتيح العامة', link:'#'}
];

// عرض المشاريع ديناميكياً
const projectsList = document.getElementById('projects-list');
if(projectsList){
  projects.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><a class="btn" href="${p.link}">عرض</a>`;
    projectsList.appendChild(el);
  });
}

// زر القائمة للهواتف
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle && menuToggle.addEventListener('click', ()=>{
  if(nav.style.display === 'flex') nav.style.display = 'none';
  else nav.style.display = 'flex';
});

// تبديل الوضع الليلي وحفظ التفضيل
const themeToggle = document.getElementById('theme-toggle');
const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
if(current === 'light') document.body.classList.add('light');
updateThemeIcon();
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon();
});
function updateThemeIcon(){
  themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
}

// خلفية جزيئات بسيطة باستخدام canvas
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
        vx: (Math.random()-0.5)*0.3,
        vy: (Math.random()-0.5)*0.3,
        hue: Math.random()*360
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
