// Cursor personalizado
const cursor=document.getElementById('cursor');
const follower=document.getElementById('cursorFollower');
let mx=0,my=0,fx=0,fy=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
(function anim(){fx+=(mx-fx)*.12;fy+=(my-fy)*.12;follower.style.left=fx+'px';follower.style.top=fy+'px';requestAnimationFrame(anim)})();

// Nav scroll state
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>40)},{passive:true});

// Reveal on scroll
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Scrolly steps
const steps=[...document.querySelectorAll('.step')];
const img=document.getElementById('scrollyImg');
const num=document.getElementById('scrollyNum');
const title=document.getElementById('scrollyTitle');
const text=document.getElementById('scrollyText');
const frame=document.getElementById('scrollyFrame');
function updateScrolly(){
  const mid=window.innerHeight*0.5;
  let active=0;
  steps.forEach((s,i)=>{
    const r=s.getBoundingClientRect();
    const center=r.top+r.height/2;
    if(center<mid) active=i;
  });
  steps.forEach((s,i)=>s.classList.toggle('active',i===active));
  const s=steps[active];
  if(s && img.getAttribute('src')!==s.dataset.img){
    img.style.opacity='0';
    setTimeout(()=>{
      img.src=s.dataset.img;
      num.textContent=s.dataset.num;
      title.textContent=s.dataset.title;
      text.textContent=s.dataset.text;
      img.style.opacity='1';
    },250);
  }
  // parallax dentro de la imagen
  const r=frame.getBoundingClientRect();
  const p=(r.top/window.innerHeight);
  img.style.transform=`scale(1.08) translateY(${p*40}px)`;
}
window.addEventListener('scroll',()=>requestAnimationFrame(updateScrolly),{passive:true});
updateScrolly();

// Animación de entrada del hero title
const lines=document.querySelectorAll('.hero-title .line');
lines.forEach((l,i)=>{l.style.opacity='0';l.style.transform='translateY(40px)';setTimeout(()=>{l.style.transition='all .8s cubic-bezier(.2,.8,.2,1)';l.style.opacity='1';l.style.transform='translateY(0)'},300+i*150)});

// Hover en cards amplía cursor
document.querySelectorAll('.feat,.prod,.gal-item,.btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{follower.style.width='70px';follower.style.height='70px'});
  el.addEventListener('mouseleave',()=>{follower.style.width='40px';follower.style.height='40px'});
});
