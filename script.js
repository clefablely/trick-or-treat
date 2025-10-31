const houses = document.querySelectorAll('.house');
const message = document.getElementById('message');
const candyCount = document.getElementById('candy-count');

let totalCandy = 0;

const knockSound = new Audio('sounds/knock.mp3');
knockSound.volume = 0.2;

const treats = [
  { text: "bbno$ gives you a check of 100€!", candy: 2 },
  { text: "miku slips a daisy into your hair and hands you a chocolate bar", candy: 3 },
  { text: "yoon seeun gives you a gummy bear!", candy: 1 },
  { text: "yang jeongin gives you a lollipop!", candy: 2 },
  { text: "you are handed a cone of woodruff ice.cream!", candy: 2 },
  { text: "gwiyoyo smooches your forehead and wishes you good luck on the rest of your trick or treating!💛", candy: 5 }
];

const tricks = [
  "leebit now haunts you. you can hear his laughter in your sleep. you should not have called him an 'ugly thing' in june..",
  "leebit has given you some suspicious soup. it smells weird. you throw it away.",
  "leebit feeds you a suspicious smoothie.. you begin to feel tired..",
  "you catch leebit consuming hanquokka. less cannibalism, more carnality.",
  "you see a half-eaten foxi.ny in the doorway. you then leave the property.",
  "no one answered.. but from now on you see leebit when you close your eyes.."
];

document.addEventListener("DOMContentLoaded", () => {
  const pumpkin = document.getElementById("pumpkin-logo");

  const laughSound = new Audio("sounds/laugh.mp3");
  const bgMusic = new Audio("sounds/bgmusic.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.2;

  let musicStarted = false;

  pumpkin.addEventListener("click", () => {
    laughSound.currentTime = 0;
    laughSound.play().catch(() => {});

    if (!musicStarted) {
      musicStarted = true;
      laughSound.addEventListener(
        "ended",
        () => {
          bgMusic.play().catch(() => {});
        },
        { once: true }
      );
    }
  });
});


houses.forEach(house => {
  house.addEventListener('click', () => {
    knockSound.currentTime = 0;
    knockSound.play();

    house.classList.add('flash');
    setTimeout(() => house.classList.remove('flash'), 300);

    const isTreat = Math.random() < 0.7;
  if (isTreat) {
    const treatVideo = document.getElementById("treat-video");
    message.classList.add("treat-font");

    // 5% chance of rare video treat
    if (Math.random() < 0.15) {
        message.textContent = `you knocked on ${house.querySelector('p').textContent}.. a super rare treat from a super hot homeowner! 🐰`;

        // show and play video
        treatVideo.style.display = "block";
        treatVideo.playbackRate = 2.0; // 2x speed
        treatVideo.currentTime = 0; // start from beginning
        treatVideo.play();

        // hide and stop after 3 seconds
        setTimeout(() => {
            treatVideo.pause();
            treatVideo.style.display = "none";
        }, 1500);
    } else {
        // normal treat behavior
        const treat = treats[Math.floor(Math.random() * treats.length)];
        totalCandy += treat.candy;
        candyCount.textContent = totalCandy;
        message.textContent = `you knocked on ${house.querySelector('p').textContent}... ${treat.text}`;
    }

    } else {
      const trick = tricks[Math.floor(Math.random() * tricks.length)];
      message.textContent = `you knocked on ${house.querySelector('p').textContent}... ${trick}`;
      message.classList.add("trick-font");

       const trickImage = document.getElementById("trick-image");

    trickImage.style.display = "block";
    trickImage.classList.remove("zoom");

    void trickImage.offsetWidth;

    trickImage.classList.add("zoom");

    setTimeout(() => {
    trickImage.classList.add("zoom");
}, 2000);

setTimeout(() => {
    trickImage.style.display = "none";
}, 3000);
    }
  });
});

