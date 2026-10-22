// Cursor personalizado
const cursor=document.getElementById('cursor');
const follower=document.getElementById('cursorFollower');
let mx=0,my=0,fx=0,fy=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'},{passive:true});
(function anim(){fx+=(mx-fx)*.12;fy+=(my-fy)*.12;follower.style.left=fx+'px';follower.style.top=fy+'px';requestAnimationFrame(anim)})();

// Nav
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>40)},{passive:true});

// Reveal con IntersectionObserver
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -10% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Scrollytelling (rAF throttled)
const steps=[...document.querySelectorAll('.step')];
const scrollyImg=document.getElementById('scrollyImg');
const scrollyNum=document.getElementById('scrollyNum');
const scrollyTitle=document.getElementById('scrollyTitle');
const scrollyText=document.getElementById('scrollyText');
const scrollyFrame=document.querySelector('.scrolly-frame');
let currentStep=0;
let ticking=false;
function updateScrolly(){
  const mid=window.innerHeight*0.5;
  let active=0;
  steps.forEach((s,i)=>{const r=s.getBoundingClientRect();const center=r.top+r.height/2;if(center<mid)active=i});
  if(active!==currentStep){
    currentStep=active;
    steps.forEach((s,i)=>s.classList.toggle('active',i===active));
    const s=steps[active];
    if(s){
      scrollyImg.style.opacity='0';
      setTimeout(()=>{
        scrollyImg.src=s.dataset.img;
        scrollyNum.textContent=s.dataset.num;
        scrollyTitle.textContent=s.dataset.title;
        scrollyText.textContent=s.dataset.text;
        scrollyImg.style.opacity='1';
      },200);
    }
  }
  const r=scrollyFrame.getBoundingClientRect();
  const p=(r.top/window.innerHeight);
  scrollyImg.style.transform='scale(1.06) translateY('+(p*30)+'px)';
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScrolly);ticking=true}},{passive:true});
updateScrolly();

// Tagline reveal por palabra
const tagline=document.getElementById('taglineText');
if(tagline){
  const words=tagline.textContent.trim().split(/\s+/);
  tagline.innerHTML=words.map(w=>'<span class="word">'+w+'</span>').join(' ');
  const wordEls=[...tagline.querySelectorAll('.word')];
  let tagTicking=false;
  function updateTagline(){
    const trigger=window.innerHeight*0.6;
    wordEls.forEach(w=>{
      const r=w.getBoundingClientRect();
      if(r.top<trigger){w.classList.add('active')}else{w.classList.remove('active')}
    });
    tagTicking=false;
  }
  window.addEventListener('scroll',()=>{if(!tagTicking){requestAnimationFrame(updateTagline);tagTicking=true}},{passive:true});
  updateTagline();
}

// Hero title entrance
const lines=document.querySelectorAll('.hero-title .line');
lines.forEach((l,i)=>{l.style.opacity='0';l.style.transform='translateY(32px)';setTimeout(()=>{l.style.transition='all .8s cubic-bezier(0.32,0.72,0,1)';l.style.opacity='1';l.style.transform='translateY(0)'},300+i*150)});

// Cursor enlarge on interactive
document.querySelectorAll('.feat,.prod,.gal-item,.btn,.nav-links a').forEach(el=>{
  el.addEventListener('mouseenter',()=>{follower.style.width='64px';follower.style.height='64px'});
  el.addEventListener('mouseleave',()=>{follower.style.width='40px';follower.style.height='40px'});
});
