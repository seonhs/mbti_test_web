// 나와 닮은 소울 푸드 - 핵심 제어 로직

(function () {
  // --- Check Data Availability ---
  const data = window.SoulFoodData;
  if (!data || !data.questions || !data.foodProfiles) {
    console.error('[SoulFood] SoulFoodData is missing or invalid.');
    alert('데이터를 불러오지 못했습니다. 페이지를 새로고침해 주세요.');
    return;
  }

  const { questions, foodProfiles } = data;

  // --- State ---
  let currentQuestionIndex = 0;
  const userAnswers = new Array(questions.length).fill(null);
  let soundEnabled = true;
  let audioCtx = null;
  let currentResult = null;

  // --- Sound Synthesizer (Web Audio API) ---
  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'next') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'fanfare') {
        const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        chord.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.12, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.6);
        });
      }
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  // --- Dynamic Non-blocking Confetti ---
  function fireConfetti() {
    if (window.confetti) {
      try {
        window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    } else {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
      s.onload = () => {
        if (window.confetti) {
          window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
      };
      document.head.appendChild(s);
    }
  }

  // --- DOM Elements ---
  const screenIntro = document.getElementById('screen-intro');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenLoading = document.getElementById('screen-loading');
  const screenResult = document.getElementById('screen-result');

  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');

  const btnStart = document.getElementById('btn-start');
  const btnPrevQuestion = document.getElementById('btn-prev-question');
  const btnRestart = document.getElementById('btn-restart');
  const btnCopyResult = document.getElementById('btn-copy-result');
  const btnSaveImage = document.getElementById('btn-save-image');

  const quizIcon = document.getElementById('quiz-icon');
  const quizCategory = document.getElementById('quiz-category');
  const quizCounter = document.getElementById('quiz-counter');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');

  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const navHome = document.getElementById('nav-home');

  const encyclopediaModal = document.getElementById('encyclopedia-modal');
  const openEncyclopediaBtn = document.getElementById('open-encyclopedia-btn');
  const closeEncyclopediaBtn = document.getElementById('close-encyclopedia-btn');
  const encyclopediaList = document.getElementById('encyclopedia-list');

  const toast = document.getElementById('toast');

  // --- Toast Utility ---
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    toastTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2200);
  }

  // --- Sound Toggle ---
  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    showToast(soundEnabled ? '효과음이 켜졌습니다.' : '효과음이 꺼졌습니다.');
    if (soundEnabled) playSound('click');
  });

  // --- Nav Home ---
  navHome.addEventListener('click', () => {
    if (screenIntro.style.display === 'none') {
      if (confirm('홈 화면으로 돌아가시겠습니까? 현재 진행 상황은 초기화됩니다.')) {
        resetQuiz();
      }
    }
  });

  // --- Screen Transitions (Direct Style Control) ---
  function showScreen(targetScreen) {
    [screenIntro, screenQuiz, screenLoading, screenResult].forEach(s => {
      s.style.display = 'none';
    });
    targetScreen.style.display = 'block';

    if (targetScreen === screenQuiz) {
      progressContainer.style.display = 'block';
    } else {
      progressContainer.style.display = 'none';
    }
  }

  // --- Start Quiz ---
  btnStart.addEventListener('click', () => {
    playSound('click');
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    showScreen(screenQuiz);
    renderQuestion();
  });

  // --- Previous Question ---
  btnPrevQuestion.addEventListener('click', () => {
    playSound('click');
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion();
    } else {
      showScreen(screenIntro);
    }
  });

  // --- Render Question ---
  function renderQuestion() {
    const q = questions[currentQuestionIndex];
    quizIcon.textContent = q.icon;
    quizCategory.textContent = q.category;
    quizCounter.textContent = `Q. ${String(currentQuestionIndex + 1).padStart(2, '0')} / ${questions.length}`;
    quizQuestion.textContent = `${q.id}. ${q.title}`;

    // Progress Bar
    const percent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${percent}%`;

    // Render Options
    quizOptions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const isSelected = userAnswers[currentQuestionIndex] === idx;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group relative overflow-hidden cursor-pointer ${
        isSelected
          ? 'border-rose-500 bg-rose-500/10 text-white font-medium shadow-md shadow-rose-950/20'
          : 'border-stone-800 bg-stone-900/80 hover:bg-stone-800/90 hover:border-stone-700 text-stone-200'
      }`;

      btn.innerHTML = `
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all ${
          isSelected
            ? 'bg-rose-500 text-white'
            : 'bg-stone-800 text-stone-400 group-hover:bg-stone-700 group-hover:text-stone-200'
        }">
          ${idx + 1}
        </span>
        <span class="text-xs sm:text-sm leading-relaxed pt-0.5 break-keep">${opt.text}</span>
      `;

      btn.addEventListener('click', () => {
        playSound('click');
        userAnswers[currentQuestionIndex] = idx;
        btn.classList.add('ring-2', 'ring-rose-500');

        setTimeout(() => {
          if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
            playSound('next');
          } else {
            finishQuiz();
          }
        }, 180);
      });

      quizOptions.appendChild(btn);
    });
  }

  // --- Finish Quiz & Compute MBTI ---
  function finishQuiz() {
    showScreen(screenLoading);

    const tips = [
      "뚝배기에 열정을 끓이는 중...",
      "에스프레소의 고압 농도를 측정하는 중...",
      "팝핑 보바의 상큼함을 톡톡 터트리는 중...",
      "마라탕의 얼얼한 매운맛을 계량하는 중...",
      "티본 스테이크를 최적의 온도에서 시어링하는 중..."
    ];
    document.getElementById('loading-tip').textContent = tips[Math.floor(Math.random() * tips.length)];

    setTimeout(() => {
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      userAnswers.forEach((ansIdx, qIdx) => {
        if (ansIdx !== null) {
          const scoreObj = questions[qIdx].options[ansIdx].score;
          for (const [dim, val] of Object.entries(scoreObj)) {
            scores[dim] = (scores[dim] || 0) + val;
          }
        }
      });

      const eOrI = scores.E >= scores.I ? 'E' : 'I';
      const sOrN = scores.S >= scores.N ? 'S' : 'N';
      const tOrF = scores.T >= scores.F ? 'T' : 'F';
      const jOrP = scores.J >= scores.P ? 'J' : 'P';

      const mbti = `${eOrI}${sOrN}${tOrF}${jOrP}`;
      const profile = foodProfiles[mbti] || foodProfiles.ISTJ;

      // Calculate percentages
      const totalEI = (scores.E + scores.I) || 1;
      const totalSN = (scores.S + scores.N) || 1;
      const totalTF = (scores.T + scores.F) || 1;
      const totalJP = (scores.J + scores.P) || 1;

      const ePct = Math.round((scores.E / totalEI) * 100);
      const iPct = 100 - ePct;
      const sPct = Math.round((scores.S / totalSN) * 100);
      const nPct = 100 - sPct;
      const tPct = Math.round((scores.T / totalTF) * 100);
      const fPct = 100 - tPct;
      const jPct = Math.round((scores.J / totalJP) * 100);
      const pPct = 100 - jPct;

      currentResult = {
        mbti,
        profile,
        scores,
        gauges: { ePct, iPct, sPct, nPct, tPct, fPct, jPct, pPct }
      };

      renderResult(currentResult);
      showScreen(screenResult);
      playSound('fanfare');
      fireConfetti();
    }, 900);
  }

  // --- Render Result Page ---
  function renderResult(result) {
    const { profile, gauges } = result;

    document.getElementById('result-emoji').textContent = profile.emoji;
    document.getElementById('result-title-tag').textContent = profile.titleTag;
    document.getElementById('result-food-name').textContent = profile.foodName;
    document.getElementById('result-mbti').textContent = profile.mbti;
    document.getElementById('result-summary').textContent = `"${profile.summary}"`;

    // Keywords
    const kwContainer = document.getElementById('result-keywords');
    kwContainer.innerHTML = '';
    profile.keywords.forEach(kw => {
      const tag = document.createElement('span');
      tag.className = 'text-xs px-2.5 py-1 rounded-lg bg-stone-950 text-rose-400 font-semibold border border-stone-800';
      tag.textContent = kw;
      kwContainer.appendChild(tag);
    });

    // Gauges
    document.getElementById('gauge-e-val').textContent = `${gauges.ePct}%`;
    document.getElementById('gauge-i-val').textContent = `${gauges.iPct}%`;
    document.getElementById('gauge-e-bar').style.width = `${gauges.ePct}%`;
    document.getElementById('gauge-i-bar').style.width = `${gauges.iPct}%`;

    document.getElementById('gauge-s-val').textContent = `${gauges.sPct}%`;
    document.getElementById('gauge-n-val').textContent = `${gauges.nPct}%`;
    document.getElementById('gauge-s-bar').style.width = `${gauges.sPct}%`;
    document.getElementById('gauge-n-bar').style.width = `${gauges.nPct}%`;

    document.getElementById('gauge-t-val').textContent = `${gauges.tPct}%`;
    document.getElementById('gauge-f-val').textContent = `${gauges.fPct}%`;
    document.getElementById('gauge-t-bar').style.width = `${gauges.tPct}%`;
    document.getElementById('gauge-f-bar').style.width = `${gauges.fPct}%`;

    document.getElementById('gauge-j-val').textContent = `${gauges.jPct}%`;
    document.getElementById('gauge-p-val').textContent = `${gauges.pPct}%`;
    document.getElementById('gauge-j-bar').style.width = `${gauges.jPct}%`;
    document.getElementById('gauge-p-bar').style.width = `${gauges.pPct}%`;

    // Detailed Analysis
    document.getElementById('result-appearance').textContent = profile.appearance;
    document.getElementById('result-ingredients').textContent = profile.ingredients;
    document.getElementById('result-recipe').textContent = profile.recipe;

    // Chemistry
    document.getElementById('result-best-match').textContent = profile.bestMatch;
    document.getElementById('result-best-desc').textContent = profile.bestMatchReason;
    document.getElementById('result-worst-match').textContent = profile.worstMatch;
    document.getElementById('result-worst-desc').textContent = profile.worstMatchReason;
  }

  // --- Copy Result Text ---
  btnCopyResult.addEventListener('click', () => {
    playSound('click');
    if (!currentResult) return;

    const { profile } = currentResult;
    const text = `[나와 닮은 소울 푸드 분석 리포트]
1. 소울 푸드 타이틀: ${profile.emoji} ${profile.foodName} (${profile.mbti})
2. 한 줄 요약: "${profile.summary}"
3. 맛으로 보는 나의 성향 키워드: ${profile.keywords.join(' ')}
4. 당신이 이 음식인 이유 (상세 분석):
   - 겉모습 (타인이 보는 나): ${profile.appearance}
   - 속재료 (내면의 사고와 감정 처리 방식): ${profile.ingredients}
   - 끓이는 법 (스트레스 대처 및 휴식 방식): ${profile.recipe}
5. 환상의 꿀조합 음식 (환상의 케미): ${profile.bestMatch}
6. 상극의 맛 (부딪히기 쉬운 유형): ${profile.worstMatch}`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 결과가 클립보드에 복사되었습니다!');
    }).catch(() => {
      showToast('복사에 실패했습니다. 직접 복사해 주세요.');
    });
  });

  // --- Save as Shareable Image (Canvas) ---
  btnSaveImage.addEventListener('click', () => {
    playSound('click');
    if (!currentResult) return;

    const { profile } = currentResult;
    const canvas = document.getElementById('export-canvas');
    const ctx = canvas.getContext('2d');

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1c1917');
    gradient.addColorStop(0.5, '#0c0a09');
    gradient.addColorStop(1, '#1c1917');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border frame
    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Header tag
    ctx.font = 'bold 18px Pretendard, sans-serif';
    ctx.fillStyle = '#fb7185';
    ctx.textAlign = 'center';
    ctx.fillText('GOURMET MBTI · SOUL FOOD REPORT', canvas.width / 2, 90);

    // Emoji
    ctx.font = '90px Pretendard, sans-serif';
    ctx.fillText(profile.emoji, canvas.width / 2, 210);

    // Subtitle
    ctx.font = 'bold 20px Pretendard, sans-serif';
    ctx.fillStyle = '#a8a29e';
    ctx.fillText(profile.titleTag, canvas.width / 2, 260);

    // Food Title + MBTI
    ctx.font = 'bold 44px Pretendard, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${profile.foodName} (${profile.mbti})`, canvas.width / 2, 320);

    // Summary
    ctx.font = 'italic 20px Pretendard, sans-serif';
    ctx.fillStyle = '#e7e5e4';
    wrapText(ctx, `"${profile.summary}"`, canvas.width / 2, 380, 680, 30);

    // Keywords
    ctx.font = 'bold 22px Pretendard, sans-serif';
    ctx.fillStyle = '#fda4af';
    ctx.fillText(profile.keywords.join('   '), canvas.width / 2, 450);

    // Card box for details
    ctx.fillStyle = '#171513';
    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 2;
    roundRect(ctx, 60, 485, 680, 400, 24);
    ctx.fill();
    ctx.stroke();

    // 3-part descriptions
    let textY = 530;
    ctx.textAlign = 'left';

    // 겉모습
    ctx.font = 'bold 20px Pretendard, sans-serif';
    ctx.fillStyle = '#fb7185';
    ctx.fillText('👀 겉모습 (타인이 보는 나)', 90, textY);
    ctx.font = '17px Pretendard, sans-serif';
    ctx.fillStyle = '#d6d3d1';
    textY = wrapText(ctx, profile.appearance, 90, textY + 30, 620, 24) + 25;

    // 속재료
    ctx.font = 'bold 20px Pretendard, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('🥩 속재료 (사고와 감정 처리)', 90, textY);
    ctx.font = '17px Pretendard, sans-serif';
    ctx.fillStyle = '#d6d3d1';
    textY = wrapText(ctx, profile.ingredients, 90, textY + 30, 620, 24) + 25;

    // 끓이는 법
    ctx.font = 'bold 20px Pretendard, sans-serif';
    ctx.fillStyle = '#818cf8';
    ctx.fillText('🔥 끓이는 법 (스트레스 대처와 휴식)', 90, textY);
    ctx.font = '17px Pretendard, sans-serif';
    ctx.fillStyle = '#d6d3d1';
    wrapText(ctx, profile.recipe, 90, textY + 30, 620, 24);

    // Chemistry footer
    ctx.fillStyle = '#064e3b';
    roundRect(ctx, 60, 915, 325, 100, 16);
    ctx.fill();
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px Pretendard, sans-serif';
    ctx.fillText('✨ 환상의 꿀조합 케미', 80, 945);
    ctx.fillStyle = '#ecfdf5';
    ctx.font = 'bold 17px Pretendard, sans-serif';
    ctx.fillText(profile.bestMatch, 80, 975);

    ctx.fillStyle = '#4c0519';
    roundRect(ctx, 415, 915, 325, 100, 16);
    ctx.fill();
    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 16px Pretendard, sans-serif';
    ctx.fillText('⚡ 상극의 맛', 435, 945);
    ctx.fillStyle = '#fff1f2';
    ctx.font = 'bold 17px Pretendard, sans-serif';
    ctx.fillText(profile.worstMatch, 435, 975);

    // Footer branding
    ctx.textAlign = 'center';
    ctx.font = '14px Pretendard, sans-serif';
    ctx.fillStyle = '#78716c';
    ctx.fillText('나와 닮은 소울 푸드 찾기 · MBTI Gourmet Test', canvas.width / 2, 1055);

    // Download Trigger
    const link = document.createElement('a');
    link.download = `soul-food-${profile.mbti}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast('🖼️ 이미지 저장이 완료되었습니다!');
  });

  // Helper for Canvas rounded rect
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Helper for Canvas text wrap
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
    return curY;
  }

  // --- Restart Quiz ---
  btnRestart.addEventListener('click', () => {
    playSound('click');
    resetQuiz();
  });

  function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    currentResult = null;
    showScreen(screenIntro);
  }

  // --- 16 Food Encyclopedia Modal ---
  openEncyclopediaBtn.addEventListener('click', () => {
    playSound('click');
    renderEncyclopedia();
    encyclopediaModal.style.display = 'flex';
  });

  closeEncyclopediaBtn.addEventListener('click', () => {
    playSound('click');
    encyclopediaModal.style.display = 'none';
  });

  encyclopediaModal.addEventListener('click', (e) => {
    if (e.target === encyclopediaModal) {
      encyclopediaModal.style.display = 'none';
    }
  });

  function renderEncyclopedia() {
    encyclopediaList.innerHTML = '';
    Object.values(foodProfiles).forEach(food => {
      const card = document.createElement('div');
      card.className = 'p-3.5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-rose-500/40 transition space-y-1.5';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">${food.emoji}</span>
            <div>
              <h4 class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>${food.foodName}</span>
                <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">${food.mbti}</span>
              </h4>
              <p class="text-[11px] text-stone-400 font-medium">${food.subtitle}</p>
            </div>
          </div>
        </div>
        <p class="text-[11px] text-stone-300 italic">"${food.summary}"</p>
        <div class="flex flex-wrap gap-1 pt-1">
          ${food.keywords.map(k => `<span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-950 text-stone-400">${k}</span>`).join('')}
        </div>
      `;
      encyclopediaList.appendChild(card);
    });
  }

  console.log('[SoulFood] App successfully initialized.');
})();
