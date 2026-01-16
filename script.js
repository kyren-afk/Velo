// ----------------------- CONFIG -----------------------
const DEV_MODE = false; // set false before sending

// ----------------------- DAYS DATA -----------------------
const days = [
  { day: "Rose Day", date: "02-07", text: "🌹Tehrim, if flowers had a queen, they’d bow to you. This rose is just a symbol; my heart already chose you long ago." },
  { day: "Chocolate Day", date: "02-09", text: "🍫Some things melt in the mouth… but you? You melt my thoughts, my focus, my entire world." },
  { day: "Teddy Day", date: "02-10", text: "🧸If I were a teddy, I’d stay in your arms forever. Safe. Warm. Home." },
  { day: "Promise Day", date: "02-11", text: "🤞I promise to choose you no matter what. Even if we are apart, you are the queen of my heart." },
  { day: "Hug Day", date: "02-12", text: "🤗If I could hug you right now, my heartbeat would say what words cannot." },
  { day: "Kiss Day", date: "02-13", text: "😘One kiss from you could rewrite my whole future. And I’d still ask for another." },
  { day: "Valentine’s Day", date: "02-14", text: `
💍 Tehrim… In a world full of people, my heart only looks for you. Will you be my Valentine? ❤️<br><br>
<button id="yesBtn">YES 💘</button>
<button id="timeBtn">I’ll take time 🤍</button>
` }
];

// ----------------------- ELEMENTS -----------------------
const container = document.getElementById("daysContainer");
const cardBox = document.getElementById("cardBox");

// ----------------------- TODAY LOGIC -----------------------
const today = new Date();
const mmdd = String(today.getMonth()+1).padStart(2,'0') + "-" + String(today.getDate()).padStart(2,'0');

days.forEach(d => {
  let btn = document.createElement("button");
  btn.innerText = d.day;

  if (DEV_MODE || mmdd >= d.date) {
    btn.onclick = () => showCard(d.text, d.day);
  } else {
    btn.disabled = true;
  }

  container.appendChild(btn);
});

// ----------------------- SHOW CARD -----------------------
function showCard(text, dayName) {
  cardBox.innerHTML = `<div class="card">${text}</div>`;

  // Attach Valentine buttons if this is Valentine's Day
  if(dayName === "Valentine’s Day") setupValentine();
}

// ----------------------- VALENTINE LOGIC -----------------------
let timeClickCount = 0;
function setupValentine() {
  const yesBtn = document.getElementById("yesBtn");
  const timeBtn = document.getElementById("timeBtn");

  yesBtn.onclick = () => yesClicked();

  timeBtn.onclick = () => {
    timeClickCount++;
    const scale = 1 + 0.3*timeClickCount;
    yesBtn.style.transform = `scale(${scale})`;
    yesBtn.style.transition = "transform 0.3s";

    const msg = timeClickCount < 3 ? "Are you really sure?" : "You really should click YES soon 😘";
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerText = msg;
    cardBox.appendChild(newCard);
  }
}

// ----------------------- YES CLICKED -----------------------
function yesClicked() {
  launchConfetti();

  emailjs.send("service_nhj0osn", "template_hkfdnfl", {
    from_name: "Tehrim",
    reply_to: "tehrim@example.com",
    message: "She said YES! Kiasat, you are officially her Valentine 💖🔥"
  })
  .then(() => console.log("Email sent!"))
  .catch(err => console.error("Email failed", err));

  cardBox.innerHTML = `
    <div class="card">
      🎉😍 SHE SAID YES!!! 😍🎉<br><br>
      Tehrim… you just made Kiasat the happiest guy alive ❤️🔥<br><br>
      (Email notification sent 📩)
    </div>
  `;
}

// ----------------------- HEARTS -----------------------
setInterval(() => {
  let heart = document.createElement("span");
  heart.innerText = "❤️";
  heart.style.left = Math.random()*100 + "vw";
  heart.style.animationDuration = (Math.random()*3+3)+"s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
},300);

// ----------------------- MUSIC -----------------------
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
playBtn.onclick = () => {
  music.play();
  playBtn.style.display = "none";
};

// ----------------------- ENVELOPE -----------------------
const seal = document.getElementById("seal");
const flap = document.getElementById("flap");
const screen = document.getElementById("envelopeScreen");
const main = document.getElementById("mainContent");

seal.onclick = () => {
  flap.style.transform = "rotateX(180deg)";
  setTimeout(() => {
    screen.style.display = "none";
    main.classList.remove("hidden");
  }, 900);
};

// ----------------------- CONFETTI -----------------------
function launchConfetti() {
  const confettiCount = 150;
  for(let i=0;i<confettiCount;i++){
    let confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random()*100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
    document.body.appendChild(confetti);

    confetti.animate([
      { transform: `translateY(0px) rotate(0deg)` },
      { transform: `translateY(100vh) rotate(${Math.random()*360}deg)` }
    ], { duration: 3000+Math.random()*2000, iterations: 1, easing: "linear" });

    setTimeout(()=>confetti.remove(),5000);
  }
}
