/* ===================================================
   آيات وتين (بايليش) - عيد ميلاد سعيد العام الأول
   Interactive JavaScript - Fully Robust & Tested
   =================================================== */

let audioCtx = null;
let isPlayingMusic = false;
let birthdayTimer = null;

function initApp() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');
  const openGiftBtn = document.getElementById('open-gift-btn');

  // Floating background elements generator
  createFloatingElements();

  // Open Gift / Welcome Handler
  if (openGiftBtn && welcomeScreen && mainContent) {
    openGiftBtn.addEventListener('click', async () => {
      await ensureAudioContext();
      playMagicChime();
      launchConfetti();

      welcomeScreen.classList.add('hidden');
      mainContent.classList.add('visible');

      // Trigger typing effect for aunt's letter
      startTypingLetter();

      // Start birthday melody automatically after user gesture (browser allows autoplay now)
      isPlayingMusic = true;
      startBirthdayMelody();
      const playMusicBtn = document.getElementById('play-music-btn');
      if (playMusicBtn) {
        playMusicBtn.style.background = '#ff6b8b';
        playMusicBtn.textContent = "🎵 الموسيقى تعمل";
        const visualizer = document.getElementById('music-visualizer');
        if (visualizer) visualizer.style.display = 'inline-block';
      }

      // Add magical welcome animation
      createWelcomeAnimation();

      // Create floating magic background
      createFloatingMagic();
    });
  }

  // Interactive Cake Candle Blowing
  const blowCandleBtn = document.getElementById('blow-candle-btn');
  const resetCelebrationBtn = document.getElementById('reset-celebration-btn');
  const cakeWrapper = document.getElementById('cake-wrapper');
  const cakeMessage = document.getElementById('cake-message');

  let candleBlown = false;

  if (blowCandleBtn && resetCelebrationBtn && cakeWrapper && cakeMessage) {
    blowCandleBtn.addEventListener('click', () => {
      if (!candleBlown) {
        candleBlown = true;
        cakeWrapper.classList.add('blown');
        cakeMessage.textContent = "يا رب تكبر بايليش بالفرح والصحة وتحقق كل أحلامها 💕";
        playBlowSound();
        createCandleBlowSparkles();
        launchConfetti();
        blowCandleBtn.style.display = 'none';
        resetCelebrationBtn.style.display = 'inline-block';
      }
    });

    resetCelebrationBtn.addEventListener('click', () => {
      candleBlown = false;
      cakeWrapper.classList.remove('blown');
      cakeMessage.textContent = "اضغطي على الزر أدناه لإطفاء الشمعة وتمني أمنية جميلة!";
      resetCelebrationBtn.style.display = 'none';
      blowCandleBtn.style.display = 'inline-block';
      playMagicChime();
      launchConfetti();
    });
  }

  // Music Control (Web Audio API Birthday melody generator)
  const playMusicBtn = document.getElementById('play-music-btn');
  const stopMusicBtn = document.getElementById('stop-music-btn');

  if (playMusicBtn) {
    playMusicBtn.addEventListener('click', async () => {
      await ensureAudioContext();
      if (!isPlayingMusic) {
        isPlayingMusic = true;
        startBirthdayMelody();
        playMusicBtn.style.background = '#ff6b8b';
        playMusicBtn.textContent = "🎵 الموسيقى تعمل";
        const visualizer = document.getElementById('music-visualizer');
        if (visualizer) visualizer.style.display = 'inline-block';
      }
    });
  }

  if (stopMusicBtn) {
    stopMusicBtn.addEventListener('click', async () => {
      await ensureAudioContext();
      if (isPlayingMusic) {
        isPlayingMusic = false;
        stopBirthdayMelody();
        if (playMusicBtn) {
          playMusicBtn.style.background = '#ff8da1';
          playMusicBtn.textContent = "🎵 تشغيل الموسيقى";
        }
        const visualizer = document.getElementById('music-visualizer');
        if (visualizer) visualizer.style.display = 'none';
      }
    });
  }

  // Scroll reveal with IntersectionObserver
  setTimeout(initScrollReveal, 100);

  // Envelope / Surprise message button
  const envelopeBtn = document.getElementById('envelope-btn');
  const envelopeContent = document.getElementById('envelope-content');
  if (envelopeBtn && envelopeContent) {
    envelopeBtn.addEventListener('click', () => {
      if (envelopeContent.style.display === 'none' || !envelopeContent.style.display) {
        envelopeContent.style.display = 'block';
        envelopeBtn.textContent = '🔒 إخفاء الرسالة السحرية';
        playMagicChime();
      } else {
        envelopeContent.style.display = 'none';
        envelopeBtn.textContent = '💌 رسالة سحرية من خالك';
      }
    });
  }
}

// Run init immediately if DOM is already loaded, otherwise listen to DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Floating Elements Generator (Hearts, Stars, Butterflies)
function createFloatingElements() {
  const container = document.getElementById('floating-elements');
  if (!container) return;
  const symbols = ['💗', '✨', '🌸', '🦋', '🎈', '⭐', '🎀', '💖'];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'float-item';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
    el.style.animationDuration = `${Math.random() * 8 + 8}s`;
    el.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(el);
  }
}

// Create floating magical butterflies, stars, hearts, petals (lightweight CSS-driven)
function createFloatingMagic() {
  const container = document.querySelector('.magical-background');
  if (!container) return;
  const elements = ['🦋', '✨', '💗', '🌸', '🎀', '⭐', '💖'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const symbol = elements[Math.floor(Math.random() * elements.length)];
    el.textContent = symbol;
    el.className = symbol === '✨' || symbol === '⭐' ? 'star' : symbol === '💗' || symbol === '💖' ? 'heart' : symbol === '🦋' ? 'butterfly' : 'float-item';

    el.style.left = `${Math.random() * 100}%`;
    el.style.top = `${Math.random() * 100}vh`;
    el.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
    el.style.opacity = Math.random() * 0.5 + 0.2;

    container.appendChild(el);
  }
}

// Typing Effect for Aunt's Letter
function startTypingLetter() {
  const letterEl = document.getElementById('aunt-letter-text');
  if (!letterEl) return;
  const fullText = "يا آيات وتين، يا فرحة العائلة ونور البيت، اليوم تكملين عامك الأول، ومع كل ضحكة منك تكبر سعادتنا بك. يا بايليش يا زهرتنا الصغيرة، ربي يحفظك ويبارك في عمرك، ويجعل أيامك مليئة بالحب والصحة والفرح. أتمنى لك مستقبلاً جميلاً وأحلاماً تتحقق واحدة تلو الأخرى. أحبك كثيراً يا أميرتنا الصغيرة.";

  letterEl.textContent = "";
  let i = 0;
  const speed = 40; // ms per character

  function typeWriter() {
    if (i < fullText.length) {
      letterEl.textContent += fullText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

// Web Audio API Sound Effects & Lullaby
function getAudioContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window['webkitAudioContext'];
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function ensureAudioContext() {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume().then(resolve).catch(resolve);
      } else {
        resolve();
      }
    } catch (e) {
      resolve();
    }
  });
}

function playMagicChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);

      gain.gain.setValueAtTime(0.15, ctx.currentTime + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.1 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.1);
      osc.stop(ctx.currentTime + index * 0.1 + 0.6);
    });
  } catch (e) {
    console.log("Audio not supported or blocked", e);
  }
}

function playBlowSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.log("Audio error", e);
  }
}

function startBirthdayMelody() {
  try {
    const ctx = getAudioContext();
    const melody = [
      {freq: 261.63, dur: 0.4}, {freq: 261.63, dur: 0.4}, {freq: 293.66, dur: 0.8}, {freq: 261.63, dur: 0.8}, {freq: 349.23, dur: 0.8}, {freq: 329.63, dur: 1.5},
      {freq: 0, dur: 0.3},
      {freq: 261.63, dur: 0.4}, {freq: 261.63, dur: 0.4}, {freq: 293.66, dur: 0.8}, {freq: 261.63, dur: 0.8}, {freq: 392.00, dur: 0.8}, {freq: 349.23, dur: 1.5},
      {freq: 0, dur: 0.3},
      {freq: 261.63, dur: 0.4}, {freq: 261.63, dur: 0.4}, {freq: 523.25, dur: 0.8}, {freq: 440.00, dur: 0.8}, {freq: 349.23, dur: 0.8}, {freq: 329.63, dur: 0.8}, {freq: 293.66, dur: 1.5},
      {freq: 0, dur: 0.3},
      {freq: 466.16, dur: 0.4}, {freq: 466.16, dur: 0.4}, {freq: 440.00, dur: 0.8}, {freq: 349.23, dur: 0.8}, {freq: 392.00, dur: 0.8}, {freq: 349.23, dur: 1.8}
    ];
    let noteIndex = 0;

    function playNextNote() {
      if (!birthdayTimer) return;
      const note = melody[noteIndex];

      if (note.freq > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime);

        const noteDuration = note.dur * 450;
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration / 1000);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + noteDuration / 1000);
      }

      noteIndex = (noteIndex + 1) % melody.length;
      const nextNote = melody[noteIndex];
      const nextDelay = (nextNote.dur * 450) + 40;
      birthdayTimer = setTimeout(playNextNote, nextDelay);
    }

    if (!birthdayTimer) {
      birthdayTimer = setTimeout(playNextNote, 50);
    }
  } catch (e) {
    console.log("Birthday melody error", e);
  }
}

function stopBirthdayMelody() {
  if (birthdayTimer) {
    clearTimeout(birthdayTimer);
    birthdayTimer = null;
  }
}

// Confetti Effect
function launchConfetti() {
  const colors = ['#ff8da1', '#ffb6c1', '#e6e6fa', '#ffd700', '#ff6b8b', '#ffffff'];
  const count = 50;

  for (let i = 0; i < count; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti';
    conf.style.width = `${Math.random() * 10 + 6}px`;
    conf.style.height = `${Math.random() * 10 + 6}px`;
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.top = '-10px';
    conf.style.left = `${Math.random() * 100}vw`;
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    conf.style.zIndex = '99999';
    conf.style.pointerEvents = 'none';

    document.body.appendChild(conf);

    setTimeout(() => { conf.remove(); }, 3500);
  }
}

// Sparkle / Touch click effect
function createSparkle(x, y) {
  const container = document.getElementById('sparkle-container');
  if (!container) return;

  const symbols = ['✨', '💖', '⭐', '💗', '🌸'];
  const count = 6;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.className = 'sparkle';
    spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    spark.style.left = `${x + (Math.random() - 0.5) * 60}px`;
    spark.style.top = `${y + (Math.random() - 0.5) * 60}px`;
    spark.style.fontSize = `${Math.random() * 1 + 0.8}rem`;
    spark.style.animationDuration = `${Math.random() * 0.4 + 0.4}s`;
    container.appendChild(spark);

    setTimeout(() => { spark.remove(); }, 800);
  }
}

document.addEventListener('click', (e) => {
  createSparkle(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  if (e.touches[0]) {
    createSparkle(e.touches[0].clientX, e.touches[0].clientY);
  }
});

// Scroll reveal with IntersectionObserver
function initScrollReveal() {
  const sections = document.querySelectorAll('.section-reveal');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// Welcome animation particles
function createWelcomeAnimation() {
  const container = document.getElementById('sparkle-container');
  if (!container) return;

  const symbols = ['✨', '💖', '⭐', '💗', '🌸', '🎀', '💫'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = `${Math.random() * 100}vh`;
    el.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
    el.style.animationDelay = `${Math.random() * 0.5}s`;
    container.appendChild(el);

    setTimeout(() => { el.remove(); }, 2000);
  }
}

// Candle blow-out sparkle effect
function createCandleBlowSparkles() {
  const cakeWrapper = document.getElementById('cake-wrapper');
  if (!cakeWrapper) return;

  const rect = cakeWrapper.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const container = document.getElementById('sparkle-container');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const spark = document.createElement('div');
    spark.className = 'sparkle';
    spark.textContent = ['✨', '💫', '⭐', '🕯️', '💖'][Math.floor(Math.random() * 5)];
    spark.style.left = `${cx + (Math.random() - 0.5) * 100}px`;
    spark.style.top = `${cy + (Math.random() - 0.5) * 80}px`;
    spark.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
    container.appendChild(spark);

    setTimeout(() => { spark.remove(); }, 800);
  }
}
