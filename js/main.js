// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>40)},{passive:true});
// Hamburger
const ham=document.getElementById('hamburger'),links=document.getElementById('navLinks');
ham.addEventListener('click',()=>links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

// Reveal on scroll
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Hero kenburns runs via CSS; no scroll parallax override

// Tour scroll-driven
const track=document.getElementById('tourTrack');
const layers=[...document.querySelectorAll('.tour-layer')];
const dots=document.getElementById('tourDots');
layers.forEach((l,i)=>{
  const d=document.createElement('div');d.className='tour-dot';d.innerHTML=`<span>${l.querySelector('h3').textContent}</span>`;
  d.addEventListener('click',()=>{const rect=track.getBoundingClientRect();const top=rect.top+window.scrollY;window.scrollTo({top:top+(track.offsetHeight-window.innerHeight)*(i/(layers.length-1)),behavior:'smooth'})});
  dots.appendChild(d);
});
function updateTour(){
  const rect=track.getBoundingClientRect();
  const total=track.offsetHeight-window.innerHeight;
  const scrolled=-rect.top;
  let p=Math.min(Math.max(scrolled/total,0),1);
  // map to layer index
  const idx=p*(layers.length-1);
  const cur=Math.round(idx);
  layers.forEach((l,i)=>{
    // opacity based on distance
    const dist=Math.abs(i-idx);
    const op=dist<1?1-dist*0.85:0;
    l.style.opacity=op;
    l.style.transform=`scale(${1+ (i===cur?0.02:0)}) translateZ(0)`;
    // parallax inside image
    const img=l.querySelector('img');
    const offset=(p*100 - i* (100/(layers.length-1))) ;
    img.style.transform=`translateY(${offset*0.25}px) scale(1.08)`;
  });
  dots.querySelectorAll('.tour-dot').forEach((d,i)=>d.classList.toggle('active',i===cur));
}
window.addEventListener('scroll',()=>{requestAnimationFrame(updateTour)},{passive:true});
updateTour();

// Parallax gallery images
const parImgs=document.querySelectorAll('.parallax-img img');
window.addEventListener('scroll',()=>{
  parImgs.forEach(img=>{
    const r=img.getBoundingClientRect();
    const center=r.top+r.height/2-window.innerHeight/2;
    img.style.transform=`translateY(${center*0.08}px) scale(1.08)`;
  });
},{passive:true});

// Smooth active nav highlight
const secs=document.querySelectorAll('section[id],header[id]');
const navAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let current='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-120) current=s.id});
  navAs.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+current?'var(--green)':''});
},{passive:true});
