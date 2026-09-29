// Personalize the details in this object; the page sections update from here.
const birthdayDetails = {
  traits: [
    { icon: "🌷", title: "Soft heart", message: "You care about people more than you probably realise." },
    { icon: "🌻", title: "Bright spirit", message: "You bring a little extra joy and laughter wherever you go." },
    { icon: "✨", title: "Your own magic", message: "There is something about the way you are that nobody else can copy." },
    { icon: "😂", title: "Little chaos", message: "A little chaos, a little drama, a lot of personality." }
  ],
  observations: [
    "You make people feel comfortable being themselves.",
    "You notice little things more than you realise.",
    "You have a way of making ordinary moments interesting.",
    "You're probably much stronger than you give yourself credit for.",
    "There is something genuinely special about the way you are."
  ],
  growthTimeline: [
    { label: "A little earlier", src: "kid.jpeg", alt: "Anuu when she was younger", caption: "Little you, just getting started." },
    { label: "You, now", src: "grown.jpeg", alt: "Anuu now", caption: "Look how much you've grown." }
  ],
  wishes: [
    { icon: "🌷", text: "More reasons to smile" },
    { icon: "✨", text: "More confidence in yourself" },
    { icon: "🌎", text: "Places you've always wanted to see" },
    { icon: "🦋", text: "Courage to chase what you want" },
    { icon: "🌙", text: "Peace on difficult days" },
    { icon: "🎀", text: "Lots of tiny happy moments" }
  ],
  surprises: [
    { icon: "🎁", label: "Open me", message: "You have a way of making a room feel a little brighter just by being yourself." },
    { icon: "🎀", label: "Open me", message: "May this year bring you new adventures, proud little moments and plenty of reasons to celebrate." },
    { icon: "💌", label: "Open me", message: "On the difficult days, remember: you don't have to have it all figured out to be doing wonderfully." }
  ],
  challenges: [
    "Do something you've always wanted to try.",
    "Take yourself somewhere beautiful.",
    "Celebrate your little wins.",
    "Stop being so hard on yourself.",
    "Make a memory you'll tell stories about.",
    "Choose yourself a little more often."
  ]
};

const byId = (id) => document.getElementById(id);
const siteContent = byId("siteContent");
const welcome = byId("welcome");
const song = byId("song");
const playButton = byId("playButton");
const trackStatus = byId("trackStatus");
const birthdayModal = byId("birthdayModal");
const birthdayCake = byId("birthdayCake");
let previousFocus = null;

function renderDetails() {
  byId("traitGrid").innerHTML = birthdayDetails.traits.map((trait, index) => `
    <button class="trait-card" type="button" aria-expanded="false" aria-controls="trait-message-${index}">
      <span class="trait-topline"><span class="trait-icon" aria-hidden="true">${trait.icon}</span><span class="trait-name">${trait.title}</span><span class="trait-hint">tap to open</span></span>
      <span class="trait-message" id="trait-message-${index}" hidden>${trait.message}</span>
    </button>
  `).join("");

  byId("noteGrid").innerHTML = birthdayDetails.observations.map((note, index) => `
    <article class="paper-note" style="--tilt: ${index % 2 === 0 ? "-1deg" : "1deg"}">${note}</article>
  `).join("");

  byId("growthGrid").innerHTML = birthdayDetails.growthTimeline.map((photo, index) => `
    <figure class="growth-photo">
      <span class="growth-label">${photo.label}</span>
      <div class="growth-image-frame">
        ${photo.src ? `<img src="${photo.src}" alt="${photo.alt}" loading="lazy">` : `<span class="growth-placeholder">your photo here</span>`}
      </div>
      <figcaption>${photo.caption}</figcaption>
    </figure>
    ${index === 0 ? '<span class="growth-arrow" aria-hidden="true">→</span>' : ""}
  `).join("");

  byId("wishGrid").innerHTML = birthdayDetails.wishes.map((wish) => `
    <div class="wish-card"><span class="wish-icon" aria-hidden="true">${wish.icon}</span><span class="wish-text">${wish.text}</span></div>
  `).join("");

  byId("surpriseGrid").innerHTML = birthdayDetails.surprises.map((surprise, index) => `
    <button class="surprise-button" type="button" data-surprise="${index}" aria-label="${surprise.label}, surprise ${index + 1}"><span class="surprise-icon" aria-hidden="true">${surprise.icon}</span><span class="surprise-label">${surprise.label}</span></button>
  `).join("");

  byId("challengeList").innerHTML = birthdayDetails.challenges.map((challenge, index) => `
    <label class="challenge-item"><input type="checkbox" name="birthday-challenge-${index}"><span class="checkmark" aria-hidden="true"></span><span class="challenge-text">${challenge}</span></label>
  `).join("");
}

function addParticles(count) {
  const symbols = ["♡", "✦", "✧", "✿"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    particle.className = `floating-particle ${symbol === "♡" ? "heart" : "star"}`;
    particle.textContent = symbol;
    particle.setAttribute("aria-hidden", "true");
    particle.style.left = `${8 + Math.random() * 84}vw`;
    particle.style.top = `${48 + Math.random() * 40}vh`;
    particle.style.fontSize = `${14 + Math.random() * 14}px`;
    particle.style.setProperty("--drift", `${Math.round(Math.random() * 100 - 50)}px`);
    particle.style.animationDelay = `${Math.random() * 180}ms`;
    fragment.appendChild(particle);
    window.setTimeout(() => particle.remove(), 2600);
  }

  document.body.appendChild(fragment);
}

function enterSite() {
  welcome.hidden = true;
  siteContent.hidden = false;
  addParticles(22);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMusic() {
  if (song.paused) {
    song.play().then(() => {
      playButton.setAttribute("aria-label", "Pause her song");
      playButton.title = "Pause her song";
      playButton.querySelector("span").textContent = "Ⅱ";
      trackStatus.textContent = "now playing";
      document.querySelector(".record-art").classList.add("is-playing");
    }).catch(() => {
      trackStatus.textContent = "Add her-song.mp3 to the site folder to play this song.";
    });
  } else {
    song.pause();
  }
}

function resetMusicButton() {
  playButton.setAttribute("aria-label", "Play her song");
  playButton.title = "Play her song";
  playButton.querySelector("span").textContent = "▶";
  document.querySelector(".record-art").classList.remove("is-playing");
  if (song.ended) trackStatus.textContent = "a song picked just for you";
}

function openBirthdayModal() {
  previousFocus = document.activeElement;
  birthdayModal.hidden = false;
  byId("closeModal").focus();
  addParticles(30);
}

function closeBirthdayModal() {
  birthdayModal.hidden = true;
  if (previousFocus instanceof HTMLElement) previousFocus.focus();
}

renderDetails();

byId("enterButton").addEventListener("click", enterSite);
birthdayCake.addEventListener("click", () => {
  if (birthdayCake.getAttribute("aria-pressed") === "true") return;
  birthdayCake.setAttribute("aria-pressed", "true");
  birthdayCake.classList.add("is-blown");
  birthdayCake.setAttribute("aria-label", "Candles blown out");
  byId("cakeStage").hidden = true;
  byId("birthdayReveal").hidden = false;
  addParticles(26);
  byId("enterButton").focus();
});
byId("traitGrid").addEventListener("click", (event) => {
  const card = event.target.closest(".trait-card");
  if (!card) return;
  const message = card.querySelector(".trait-message");
  const expanded = card.getAttribute("aria-expanded") === "true";
  card.setAttribute("aria-expanded", String(!expanded));
  message.hidden = expanded;
  card.querySelector(".trait-hint").textContent = expanded ? "tap to open" : "tap to close";
});

byId("surpriseGrid").addEventListener("click", (event) => {
  const button = event.target.closest(".surprise-button");
  if (!button) return;
  const surprise = birthdayDetails.surprises[Number(button.dataset.surprise)];
  const output = byId("surpriseMessage");
  output.textContent = surprise.message;
  output.hidden = false;
  byId("surpriseGrid").querySelectorAll(".surprise-button").forEach((item) => item.classList.toggle("is-open", item === button));
});

playButton.addEventListener("click", toggleMusic);
song.addEventListener("pause", resetMusicButton);
song.addEventListener("ended", resetMusicButton);
song.addEventListener("error", () => {
  trackStatus.textContent = "Add her-song.mp3 to the site folder to play this song.";
});

byId("finalButton").addEventListener("click", openBirthdayModal);
byId("closeModal").addEventListener("click", closeBirthdayModal);
birthdayModal.querySelector(".modal-backdrop").addEventListener("click", closeBirthdayModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !birthdayModal.hidden) closeBirthdayModal();
});