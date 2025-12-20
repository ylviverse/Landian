import './style.css'
import lottie from 'lottie-web'
import proposalAnimationData from './assets/cute.json'
import celebrationAnimationData from './assets/yay.json'
import sadAnimationData from './assets/cake.json'

let countdownInterval = null;

document.querySelector('#app').innerHTML = `
  <div id="proposal-screen" class="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 overflow-y-auto">
    <div class="text-center p-8 max-w-2xl w-full px-6 my-auto">
      <div class="w-64 h-64 mx-auto mb-0 flex items-center justify-center">
        <div id="lottie-animation" class="w-full h-full"></div>
      </div>
      <h1 class="text-5xl font-bold text-gray-800 mb-3 px-4">HI LEW! MADE SOMETHING FOR YOU HEHEHE ᥫ᭡.</h1>
      <button id="next-btn" class="btn-scale bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg mt-6">
        Next
      </button>
    </div>
  </div>

  <div id="sad-screen" class="hidden flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 overflow-y-auto py-8 relative">
    <div id="tulips-container" class="absolute inset-0 pointer-events-none overflow-hidden"></div>
    <div class="text-center p-4 sm:p-8 max-w-2xl w-full px-6 my-auto relative z-10">
      <div class="w-64 h-64 sm:w-96 sm:h-96 mx-auto mb-4 sm:mb-8 flex items-center justify-center">
        <div id="sad-animation" class="w-full h-full"></div>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">HAPPIEST BIRTHDAY <br> Leo  ⸜(｡˃ ᵕ ˂ )⸝♡</h1>
      <p class="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 px-4">Wishing you lots of smiles, and Love. May your year be full of peace, growth, and little things that makes you happy. Welcome sa 20s, amping permi and don't forget to value yourself above all else :3</p>
      <button id="continue-btn" class="btn-scale bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
        MAKE A WISH
      </button>
    </div>
  </div>

  <div id="celebration-screen" class="hidden flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 overflow-y-auto">
    <div class="text-center p-8 max-w-2xl w-full px-6 my-auto">
      <div class="w-96 h-96 mx-auto mb-8 flex items-center justify-center">
        <div id="celebration-animation" class="w-full h-full"></div>
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4 px-4">Make a wish in</h1>
      <div id="countdown" class="text-8xl font-bold text-gray-800 mb-6">4</div>
      <button id="joke-no-btn" class="hidden btn-scale bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
        Pindotin mo ito duh
      </button>
    </div>
  </div>

  <div id="video-screen" class="hidden flex items-center justify-center min-h-screen bg-black">
    <div class="w-full h-full">
      <video id="video-player" class="w-full h-full object-cover" controls playsinline webkit-playsinline preload="metadata">
        <source src="/assets/birthday.mov" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
`

const proposalAnimation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: proposalAnimationData 
  });

const nextBtn = document.getElementById('next-btn');
const continueBtn = document.getElementById('continue-btn');
const jokeNoBtn = document.getElementById('joke-no-btn');
const proposalScreen = document.getElementById('proposal-screen');
const sadScreen = document.getElementById('sad-screen');
const celebrationScreen = document.getElementById('celebration-screen');
const videoScreen = document.getElementById('video-screen');
const videoPlayer = document.getElementById('video-player');
const countdownElement = document.getElementById('countdown');
const tulipsContainer = document.getElementById('tulips-container');

nextBtn.addEventListener('click', () => {
  proposalScreen.classList.add('hidden');
  sadScreen.classList.remove('hidden');

  lottie.loadAnimation({
    container: document.getElementById('sad-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: celebrationAnimationData
  });

  // Create tulips when entering the birthday screen
  createTulips();
});

continueBtn.addEventListener('click', () => {
  sadScreen.classList.add('hidden');
  celebrationScreen.classList.remove('hidden');

  lottie.loadAnimation({
    container: document.getElementById('celebration-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: sadAnimationData
  });

  // Start countdown
  startCountdown();
});

function startCountdown() {
  let timeLeft = 4;
  countdownElement.textContent = timeLeft;
  
  countdownInterval = setInterval(() => {
    timeLeft--;
    
    if (timeLeft > 0) {
      countdownElement.textContent = timeLeft;
    } else {
      clearInterval(countdownInterval);
      // Play video after countdown
      setTimeout(() => {
        playVideo();
      }, 500);
    }
  }, 1000);
}

function createTulips() {
  const tulipEmojis = ['🤍', '💕', '🌼', '🌸'];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const tulip = document.createElement('div');
      tulip.textContent = tulipEmojis[Math.floor(Math.random() * tulipEmojis.length)];
      tulip.style.position = 'absolute';
      tulip.style.fontSize = Math.random() * 20 + 30 + 'px';
      tulip.style.left = Math.random() * 100 + '%';
      tulip.style.top = '-50px';
      tulip.style.opacity = '0.8';
      tulip.style.transition = 'all 3s linear';
      tulip.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      tulipsContainer.appendChild(tulip);
      
      // Animate falling
      setTimeout(() => {
        tulip.style.top = '100vh';
        tulip.style.transform = `rotate(${Math.random() * 720}deg)`;
      }, 100);
      
      // Remove after animation
      setTimeout(() => {
        tulip.remove();
      }, 3100);
    }, i * 100);
  }
}

function playVideo() {
  celebrationScreen.classList.add('hidden');
  videoScreen.classList.remove('hidden');
  
  // Play video with error handling for mobile
  videoPlayer.play().catch(error => {
    console.log('Autoplay prevented:', error);
    videoPlayer.controls = true;
  });
}

jokeNoBtn.addEventListener('click', () => {
  // Ready for your new idea!
  console.log('Button clicked - add your new functionality here!');
});