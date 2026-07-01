document.addEventListener("DOMContentLoaded", function () {
  const startDate = new Date("2024-07-04T00:00:00");

  const counter = document.getElementById("relationshipCounter");
  const envelope = document.getElementById("envelope");
  const openLetterBtn = document.getElementById("openLetterBtn");
  const questionArea = document.getElementById("questionArea");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const loveSong = document.getElementById("loveSong");
  const introScreen = document.getElementById("introScreen");
  const loveScreen = document.getElementById("loveScreen");

  const typewriterText = document.getElementById("typewriterText");
  const carouselImage = document.getElementById("carouselImage");
  const photoNumber = document.getElementById("photoNumber");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const revealBtn = document.getElementById("revealBtn");
  const dateCard = document.getElementById("dateCard");

  function updateCounter() {
    if (!counter) return;

    const diff = new Date() - startDate;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);

    counter.innerHTML =
      days.toLocaleString() +
      " Days<br>" +
      hours.toLocaleString() +
      " Hours<br>Together ❤️";
  }

  updateCounter();
  setInterval(updateCounter, 1000);

  function fadeInMusic() {
    if (!loveSong) return;

    loveSong.volume = 0;
    loveSong.currentTime = 0;

    loveSong.play().catch(function () {
      console.log("Music file missing or blocked.");
    });

    let volume = 0;

    const fade = setInterval(function () {
      volume += 0.02;

      if (volume >= 0.6) {
        volume = 0.6;
        clearInterval(fade);
      }

      loveSong.volume = volume;
    }, 100);
  }

  if (openLetterBtn) {
    openLetterBtn.addEventListener("click", function () {
      if (envelope) envelope.classList.add("open");

      openLetterBtn.style.display = "none";

      setTimeout(function () {
        if (questionArea) questionArea.classList.add("show");
      }, 1200);

      createHeartBurst(25);
    });
  }

  function moveNoButton() {
    if (!noBtn) return;

    noBtn.style.position = "fixed";
    noBtn.style.zIndex = "9999";

    const maxX = window.innerWidth - noBtn.offsetWidth - 30;
    const maxY = window.innerHeight - noBtn.offsetHeight - 30;

    noBtn.style.left = Math.random() * Math.max(maxX, 0) + "px";
    noBtn.style.top = Math.random() * Math.max(maxY, 0) + "px";
  }

  if (noBtn) {
    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("click", function (e) {
      e.preventDefault();
      moveNoButton();
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener("click", function () {
      fadeInMusic();
      createHeartBurst(80);

      setTimeout(function () {
        if (introScreen) introScreen.classList.remove("active");
        if (loveScreen) loveScreen.classList.add("active");

        window.scrollTo(0, 0);
        startTypewriter();
      }, 900);
    });
  }

  function createHeartBurst(amount) {
    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("div");

      heart.className = "burst-heart";
      heart.textContent = ["❤️", "💕", "💖", "💗"][Math.floor(Math.random() * 4)];
      heart.style.left = window.innerWidth / 2 + "px";
      heart.style.top = window.innerHeight / 2 + "px";
      heart.style.setProperty("--x", Math.random() * 520 - 260 + "px");
      heart.style.fontSize = 18 + Math.random() * 22 + "px";

      document.body.appendChild(heart);

      setTimeout(function () {
        heart.remove();
      }, 3000);
    }
  }

  setInterval(function () {
    const heart = document.createElement("div");

    heart.className = "floating-heart";
    heart.textContent = ["❤️", "💕", "💖", "🌸"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 6 + Math.random() * 6 + "s";

    document.body.appendChild(heart);

    setTimeout(function () {
      heart.remove();
    }, 12000);
  }, 900);

  document.addEventListener("mousemove", function (e) {
    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";

    document.body.appendChild(sparkle);

    setTimeout(function () {
      sparkle.remove();
    }, 700);
  });

  const letter =
    "Niamh,\n\n" +
    "I have missed you SO MUCH!! I hope we have the best anniversary ever today, and I cant wait to hug, kiss you, and smile with you all day long :) \n\n" +
    "These two years with you have meant more to me than you could ever know. You are the smartest, and kindest person I've ever met as well as my best Travel buddy xx.\n\n" +
    "I'm so excited to spend the rest of our lives together, especially with your much closer Sheffield move. I am really so incredibly proud of you. I love you so much.\n\n" +
    "- Mateusz ❤️";

  let typingStarted = false;

  function startTypewriter() {
    if (!typewriterText || typingStarted) return;

    typingStarted = true;
    typewriterText.textContent = "";

    let i = 0;

    const typing = setInterval(function () {
      typewriterText.textContent += letter.charAt(i);
      i++;

      if (i >= letter.length) {
        clearInterval(typing);
      }
    }, 30);
  }

  const photos = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg"
  ];

  let currentPhoto = 0;

  function showPhoto() {
    if (!carouselImage || !photoNumber) return;

    carouselImage.src = photos[currentPhoto];
    photoNumber.textContent = currentPhoto + 1 + " / " + photos.length;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      currentPhoto = (currentPhoto + 1) % photos.length;
      showPhoto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
      showPhoto();
    });
  }

  showPhoto();

  setInterval(function () {
    currentPhoto = (currentPhoto + 1) % photos.length;
    showPhoto();
  }, 5000);

  if (revealBtn && dateCard) {
    revealBtn.addEventListener("click", function () {
      dateCard.classList.toggle("show");

      revealBtn.textContent = dateCard.classList.contains("show")
        ? "Hide Our Date ❤️"
        : "Reveal Our Date 🗺️";

      if (dateCard.classList.contains("show")) {
        createHeartBurst(30);
      }
    });
  }
});
