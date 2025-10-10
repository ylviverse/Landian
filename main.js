import './style.css'
import lottie from 'lottie-web'
import proposalAnimationData from './assets/cute.json'
import celebrationAnimationData from './assets/yay.json'

let yesButtonScale = 1;
let noButtonClicks = 0;

document.querySelector('#app').innerHTML = `
  <div id="proposal-screen" class="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200">
    <div class="text-center p-8 max-w-2xl">
      <div id="lottie-animation" class="w-64 h-64 mx-auto mb-0"></div>
      <h1 class="text-5xl font-bold text-gray-800 mb-3">Hi Bri, Pede kabang landiin huhu?</h1>
      <div class="flex gap-6 justify-center items-end mb-4">
        <button id="yes-btn" class="btn-scale bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">
          YES!
        </button>
        <button id="no-btn" class="btn-scale bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-full shadow-lg">
          No
        </button>
      </div>
      <div class="text-gray-600 text-lg italic">
        pls pls pls :>
      </div>
    </div>
  </div>

  <div id="celebration-screen" class="hidden flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200">
    <div class="text-center p-8 max-w-2xl">
      <div id="celebration-animation" class="w-96 h-96 mx-auto mb-8"></div>
      <h1 class="text-6xl font-bold text-gray-800 mb-4">YAYYYY!</h1>
      <p class="text-2xl text-gray-700">HEHEHEHEHEHEHEHE :> !</p>
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
  
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const proposalScreen = document.getElementById('proposal-screen');
const celebrationScreen = document.getElementById('celebration-screen');

yesBtn.addEventListener('click', () => {
    proposalScreen.classList.add('hidden');
    celebrationScreen.classList.remove('hidden');
  
    lottie.loadAnimation({
      container: document.getElementById('celebration-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: celebrationAnimationData
    });
  });

noBtn.addEventListener('click', () => {
  noButtonClicks++;
  yesButtonScale += 0.3;

  yesBtn.style.transform = `scale(${yesButtonScale})`;
  yesBtn.style.padding = `${1 + (noButtonClicks * 0.2)}rem ${2 + (noButtonClicks * 0.4)}rem`;

  if (noButtonClicks >= 5) {
    noBtn.style.display = 'none';
  }
});