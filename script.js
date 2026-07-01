document.addEventListener('DOMContentLoaded', () => {
  const startDate = new Date('2024-07-04T00:00:00');
  const counter = document.getElementById('relationshipCounter');
  const envelope = document.getElementById('envelope');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const questionArea = document.getElementById('questionArea');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const loveSong = document.getElementById('loveSong');
  const introScreen = document.getElementById('introScreen');
  const loveScreen = document.getElementById('loveScreen');
  const typewriterText = document.getElementById('typewriterText');
  const carouselImage = document.getElementById('carouselImage');
  const photoNumber = document.getElementById('photoNumber');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const revealBtn = document.getElementById('revealBtn');
  const dateCard = document.getElementById('dateCard');

  function updateCounter(){
    if(!counter) return;
    const diff = new Date() - startDate;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    counter.innerHTML = `${days.toLocaleString()} Days<br>${hours.toLocaleString()} Hours<br>Together ❤️`;
  }
  updateCounter(); setInterval(updateCounter, 1000);

  openLetterBtn.addEventListener('click', () => {
    envelope.classList.add('open');
    openLetterBtn.style.display = 'none';
    setTimeout(() => questionArea.classList.add('show'), 1250);
    createHeartBurst(24);
  });

  function moveNo(){
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${Math.random() * Math.max(maxX, 10)}px`;
    noBtn.style.top = `${Math.random() * Math.max(maxY, 10)}px`;
  }
  noBtn.addEventListener('mouseenter', moveNo);
  noBtn.addEventListener('touchstart', (e)=>{ e.preventDefault(); moveNo(); });
  noBtn.addEventListener('click', (e)=>{ e.preventDefault(); moveNo(); });

  yesBtn.addEventListener('click', async () => {
    try { await loveSong.play(); } catch(e) { console.log('Music blocked or missing:', e); }
    createHeartBurst(70);
    setTimeout(() => {
      introScreen.classList.remove('active');
      loveScreen.classList.add('active');
      window.scrollTo(0,0);
      startTypewriter();
    }, 1200);
  });

  function createHeartBurst(count){
    for(let i=0;i<count;i++){
      const heart = document.createElement('div');
      heart.className = 'burst-heart';
      heart.textContent = ['❤️','💕','💖','💗'][Math.floor(Math.random()*4)];
      heart.style.left = `${window.innerWidth/2}px`;
      heart.style.top = `${window.innerHeight/2}px`;
      heart.style.setProperty('--x', `${Math.random()*520-260}px`);
      heart.style.fontSize = `${18 + Math.random()*26}px`;
      document.body.appendChild(heart);
      setTimeout(()=>heart.remove(), 3000);
    }
  }

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['❤️','💕','💖','🌸'][Math.floor(Math.random()*4)];
    heart.style.left = `${Math.random()*100}vw`;
    heart.style.animationDuration = `${6+Math.random()*6}s`;
    heart.style.opacity = `${0.45+Math.random()*0.5}`;
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(), 12000);
  }, 900);

  document.addEventListener('mousemove', (e) => {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 700);
  });

  const letter = `Tutu,\n\nThank you for every laugh, every memory, every adventure, and every ordinary day that you somehow make feel special.\n\nThese two years with you have meant more to me than I can properly put into words. You are my favourite person, my safest place, and my best adventure.\n\nI love you so much.\n\n- Nim ❤️`;
  let typingStarted = false;
  function startTypewriter(){
    if(typingStarted) return; typingStarted = true;
    let i = 0; typewriterText.textContent = '';
    const timer = setInterval(()=>{
      typewriterText.textContent += letter[i] || '';
      i++;
      if(i >= letter.length) clearInterval(timer);
    }, 32);
  }

  const photos = Array.from({length:10}, (_,i)=>`images/photo${i+1}.jpg`);
  let current = 0;
  function showPhoto(){
    carouselImage.src = photos[current];
    photoNumber.textContent = `${current+1} / ${photos.length}`;
  }
  nextBtn.addEventListener('click', ()=>{current=(current+1)%photos.length; showPhoto();});
  prevBtn.addEventListener('click', ()=>{current=(current-1+photos.length)%photos.length; showPhoto();});
  setInterval(()=>{current=(current+1)%photos.length; showPhoto();}, 5000);
  showPhoto();

  revealBtn.addEventListener('click', () => {
    dateCard.classList.toggle('show');
    revealBtn.textContent = dateCard.classList.contains('show') ? 'Hide Our Date ❤️' : 'Reveal Our Date 🗺️';
    if(dateCard.classList.contains('show')) createHeartBurst(30);
  });
});
