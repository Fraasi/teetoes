/* eslint-disable no-plusplus */

export default function player() {
  const soundbox = document.getElementById('soundbox');
  const cnvs = document.getElementById('cnvs');

  const audio = new Audio();
  // audio.crossOrigin = 'anonymous';
  audio.src = `${__dirname.slice(0, -2)}teetoes.mp3`;
  audio.controls = true;

  let audioCtx;
  let analyser;
  let ctx;
  let source;
  // const ch2 = cnvs.height / 2;

  let fbcArr;
  let bars;
  let barX;
  let barWidth;
  let barHeight;
  let gradient;

  function framelooper() {
    window.requestAnimationFrame(framelooper);
    fbcArr = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbcArr);
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    bars = 150;
    for (let i = 0; i < bars; i++) {
      barX = i * 2;
      barWidth = 1;
      barHeight = -(fbcArr[i] / 3);

      ctx.fillRect(barX, cnvs.height / 2, barWidth, barHeight);

      ctx.save();
      gradient = ctx.createLinearGradient(0, cnvs.height / 2, 0, cnvs.height);
      gradient.addColorStop(0, 'orange');
      gradient.addColorStop(0.3, 'red');
      gradient.addColorStop(1, 'black');
      ctx.fillStyle = gradient;
      ctx.fillRect(barX, cnvs.height / 2, barWidth, -barHeight);
      ctx.restore();
    }
  }

  function initPlayer() {
    soundbox.appendChild(audio);
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    ctx = cnvs.getContext('2d');
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    gradient = ctx.createLinearGradient(0, cnvs.height / 2, 0, 0);
    gradient.addColorStop(0, 'orange');
    gradient.addColorStop(0.3, 'red');
    gradient.addColorStop(1, 'black');
    ctx.fillStyle = gradient;

    framelooper();
  }
  window.addEventListener('load', initPlayer, false);
}
