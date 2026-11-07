        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        let masterScrollTrigger = null;

        // NavegaÃ§Ã£o suave para qualquer estÃ¡gio de scroll da caneta
        function scrollToStage(progressRatio) {
            if (!masterScrollTrigger) return;
            const targetY = masterScrollTrigger.start + (masterScrollTrigger.end - masterScrollTrigger.start) * progressRatio;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }

        // NavegaÃ§Ã£o suave para a Segunda Dobra sem poluir a URL com hash
        function scrollToSecondFold() {
            const fold2 = document.getElementById('segunda-dobra');
            if (fold2) {
                fold2.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // NavegaÃ§Ã£o suave para a seÃ§Ã£o de compra sem poluir a URL com hash #comprar
        function scrollToBuy() {
            const buySection = document.getElementById('comprar');
            if (buySection) {
                buySection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Alternar modo Mix-Blend-Difference do Design System
        function toggleMixBlend() {
            const target = document.getElementById('stage-1-blend-target');
            if (target) target.classList.toggle('mix-blend-diff');
        }

        // =========================================================================
        // 4.1 ESTADO & DADOS TÃ‰CNICOS DOS MÃ“DULOS DE PRECISÃƒO (SEÃ‡ÃƒO 02 - ANEXO 02)
        // =========================================================================
        const techFeaturesData = [
            {
                coreLabel: 'CORE_ALU_7075-T6',
                coreBar: '88%',
                tipVal: '0.1',
                tipUnit: 'mm',
                tipLabel: 'TIP_PRECISION // SWISS CNC'
            },
            {
                coreLabel: 'NANO-PIGMENTUMâ„¢ 0.04S',
                coreBar: '100%',
                tipVal: '0.04',
                tipUnit: 's',
                tipLabel: 'INSTANT_DRY // ARCHIVAL INK'
            },
            {
                coreLabel: 'LASER_GRIP_RA0.8',
                coreBar: '96%',
                tipVal: 'Ra 0.8',
                tipUnit: 'Âµm',
                tipLabel: 'DIAMOND_KNURL // 5-AXIS CNC'
            },
            {
                coreLabel: 'LIVE_CANVAS_0.10MM',
                coreBar: '100%',
                tipVal: '0.10',
                tipUnit: 'mm',
                tipLabel: 'SCRATCHPAD // ARCHITECTURE'
            }
        ];

        let currentTechIndex = 0;

        function selectTechFeature(index) {
            if (index < 0 || index >= techFeaturesData.length) return;
            currentTechIndex = index;
            const data = techFeaturesData[index];

            // 1. Alterna estado ativo nos cards da lista vertical
            for (let i = 0; i < 4; i++) {
                const card = document.getElementById(`tech-card-${i}`);
                if (card) {
                    if (i === index) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                }
            }

            // 2. Atualiza os HUD Badges de Vidro Flutuantes sobre a Imagem Macro
            const coreLabel = document.getElementById('hud-glass-core-label');
            const coreBar = document.getElementById('hud-glass-core-bar');
            const tipVal = document.getElementById('hud-glass-tip-val');
            const tipLabel = document.getElementById('hud-glass-tip-label');

            if (coreLabel) coreLabel.textContent = data.coreLabel;
            if (coreBar) coreBar.style.width = data.coreBar;
            if (tipVal) {
                tipVal.innerHTML = `${data.tipVal}<span class="text-xs font-mono font-semibold text-zinc-500 align-top ml-1">${data.tipUnit}</span>`;
            }
            if (tipLabel) tipLabel.textContent = data.tipLabel;

            // Se for o card 04 (Prancheta), rola suavemente atÃ© ela e inicializa o canvas
            if (index === 3) {
                const scratchSection = document.getElementById('scratchpad-section');
                if (scratchSection) {
                    scratchSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                setTimeout(initScratchpad, 200);
            }
        }

        let activeVisualMode = 'macro';

        // Alternador de Lente / Fotografia do Palco Ã“ptico (Apenas Macro e Studio)
        function switchTechVisual(mode, btn) {
            activeVisualMode = mode;
            document.querySelectorAll('.tech-lens-pill').forEach((b) => {
                b.classList.remove('active', 'bg-black', 'text-white', 'font-medium');
                b.classList.add('text-zinc-600');
            });
            if (btn) {
                btn.classList.add('active', 'bg-black', 'text-white', 'font-medium');
                btn.classList.remove('text-zinc-600');
            }

            const img = document.getElementById('tech-feature-img');
            const hotspots = document.getElementById('macro-hotspots-layer');
            const telemetry = document.getElementById('macro-telemetry-badge');
            if (!img) return;

            if (mode === 'macro') {
                img.src = 'assets/images/artools_tech_macro_enhanced.jpg';
                if (hotspots) hotspots.style.opacity = '1';
                if (telemetry) telemetry.style.opacity = '0.85';
            } else if (mode === 'studio') {
                img.src = 'assets/images/pen_studio_showcase.jpg';
                if (hotspots) hotspots.style.opacity = '0';
                if (telemetry) telemetry.style.opacity = '0';
                img.style.transform = 'scale(1)';
                img.style.transformOrigin = 'center center';
            }

            if (window.gsap) {
                gsap.fromTo(img, { scale: 1.06, opacity: 0.65 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
            }
        }

        // FunÃ§Ã£o de Lanterna / Rastreamento Radial para os Flashlight Cards (SeÃ§Ã£o 03)
        window.updateFlashlight = function (e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        // =========================================================================
        // 4.2 PRANCHETA VIRTUAL DE TESTE DE TRAÃ‡O 0.1MM (CANVAS SCRATCHPAD) & ÃUDIO ASMR
        // =========================================================================
        function playPenStrokeSound(intensity = 0.5) {
            try {
                if (!asmrAudioCtx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    asmrAudioCtx = new AudioContext();
                }
                if (asmrAudioCtx.state === 'suspended') {
                    asmrAudioCtx.resume();
                }
                const dur = 0.05 + Math.random() * 0.03;
                const bufferSize = Math.floor(asmrAudioCtx.sampleRate * dur);
                const buffer = asmrAudioCtx.createBuffer(1, bufferSize, asmrAudioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
                }
                const noise = asmrAudioCtx.createBufferSource();
                noise.buffer = buffer;
                const filter = asmrAudioCtx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 2800 + Math.random() * 600;
                filter.Q.value = 2.5;
                const gain = asmrAudioCtx.createGain();
                gain.gain.value = 0.028 * intensity;
                gain.gain.exponentialRampToValueAtTime(0.0001, asmrAudioCtx.currentTime + dur);
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(asmrAudioCtx.destination);
                noise.start();
            } catch (e) {}
        }

        let padCanvas = null;
        let padCtx = null;
        let padDrawing = false;
        let padStrokeWidth = 0.8; // Calibrado para o traÃ§o 0.10mm
        let padStrokeColor = '#18181b';
        let padTotalDist = 0;
        let padLastX = 0;
        let padLastY = 0;
        let padInitialized = false;

        function initScratchpad() {
            padCanvas = document.getElementById('stroke-scratchpad');
            if (!padCanvas) return;

            const rect = padCanvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            if (!padInitialized || padCanvas.width !== Math.floor(rect.width * dpr)) {
                padCanvas.width = Math.floor(rect.width * dpr);
                padCanvas.height = Math.floor(rect.height * dpr);
                padCtx = padCanvas.getContext('2d');
                padCtx.scale(dpr, dpr);
                padCtx.lineCap = 'round';
                padCtx.lineJoin = 'round';
                padInitialized = true;
            }

            function getPos(e) {
                const b = padCanvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                return {
                    x: clientX - b.left,
                    y: clientY - b.top
                };
            }

            function startDraw(e) {
                padDrawing = true;
                const pos = getPos(e);
                padLastX = pos.x;
                padLastY = pos.y;
                const hint = document.getElementById('scratchpad-hint');
                if (hint) hint.style.opacity = '0';
            }

            function moveDraw(e) {
                if (!padDrawing || !padCtx) return;
                const pos = getPos(e);

                padCtx.beginPath();
                padCtx.moveTo(padLastX, padLastY);
                padCtx.lineTo(pos.x, pos.y);
                padCtx.strokeStyle = padStrokeColor;
                padCtx.lineWidth = padStrokeWidth;
                padCtx.stroke();

                // Calcula distÃ¢ncia acumulada em cm
                const dx = pos.x - padLastX;
                const dy = pos.y - padLastY;
                const stepPx = Math.sqrt(dx * dx + dy * dy);
                padTotalDist += (stepPx / 37.8);

                if (stepPx > 3) {
                    playPenStrokeSound(Math.min(stepPx / 14, 1));
                }

                const counter = document.getElementById('pad-dist-counter');
                if (counter) counter.textContent = `${padTotalDist.toFixed(1)} cm`;

                padLastX = pos.x;
                padLastY = pos.y;
            }

            function endDraw() {
                padDrawing = false;
            }

            padCanvas.onmousedown = startDraw;
            window.addEventListener('mousemove', moveDraw);
            window.addEventListener('mouseup', endDraw);

            padCanvas.ontouchstart = (e) => { e.preventDefault(); startDraw(e); };
            padCanvas.ontouchmove = (e) => { e.preventDefault(); moveDraw(e); };
            padCanvas.ontouchend = endDraw;
        }

        function setPadWidth(w, btn) {
            padStrokeWidth = w;
            document.querySelectorAll('.pad-tool-width').forEach((b) => {
                b.classList.remove('active', 'bg-black', 'text-white', 'font-bold');
                b.classList.add('bg-white', 'text-zinc-700');
            });
            if (btn) {
                btn.classList.add('active', 'bg-black', 'text-white', 'font-bold');
                btn.classList.remove('bg-white', 'text-zinc-700');
            }
        }

        function clearPadCanvas() {
            if (!padCanvas || !padCtx) return;
            const dpr = window.devicePixelRatio || 1;
            padCtx.clearRect(0, 0, padCanvas.width / dpr, padCanvas.height / dpr);
            padTotalDist = 0;
            const counter = document.getElementById('pad-dist-counter');
            if (counter) counter.textContent = '0.0 cm';
            const hint = document.getElementById('scratchpad-hint');
            if (hint) hint.style.opacity = '1';
        }

        function drawPadDemo() {
            if (!padCanvas) initScratchpad();
            if (!padCtx) return;

            clearPadCanvas();
            const hint = document.getElementById('scratchpad-hint');
            if (hint) hint.style.opacity = '0';

            const rect = padCanvas.getBoundingClientRect();
            const startX = rect.width * 0.15;
            const startY = rect.height * 0.55;

            padCtx.strokeStyle = '#18181b';
            padCtx.lineWidth = 0.85;
            padCtx.beginPath();
            padCtx.moveTo(startX, startY);

            // TraÃ§o de assinatura suave de alta fidelidade
            let points = [
                { x: startX + 30, y: startY - 45 },
                { x: startX + 65, y: startY + 15 },
                { x: startX + 110, y: startY - 30 },
                { x: startX + 155, y: startY + 5 },
                { x: startX + 210, y: startY - 50 },
                { x: startX + 270, y: startY + 10 },
                { x: startX + 340, y: startY - 15 }
            ];

            let i = 0;
            function step() {
                if (i < points.length) {
                    padCtx.lineTo(points[i].x, points[i].y);
                    padCtx.stroke();
                    padTotalDist += 2.8;
                    const counter = document.getElementById('pad-dist-counter');
                    if (counter) counter.textContent = `${padTotalDist.toFixed(1)} cm`;
                    i++;
                    requestAnimationFrame(step);
                } else {
                    padCtx.beginPath();
                    padCtx.moveTo(startX, startY + 30);
                    padCtx.lineTo(startX + 340, startY + 30);
                    padCtx.strokeStyle = 'rgba(24, 24, 27, 0.4)';
                    padCtx.lineWidth = 0.5;
                    padCtx.stroke();
                }
            }
            step();
        }

        // =========================================================================
        // 4.4 ATELIER & CONFIGURADOR INTERATIVO (TERCEIRA DOBRA)
        // =========================================================================
        let selectedCaliber = '0.10mm';
        let selectedInk = 'Carbon Black';
        let dryTestRunning = false;

        function scrollToThirdFold() {
            const fold3 = document.getElementById('terceira-dobra');
            if (fold3) {
                fold3.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function scrollToFourthFold() {
            const fold4 = document.getElementById('quarta-dobra');
            if (fold4) {
                fold4.scrollIntoView({ behavior: 'smooth' });
            }
        }

        let asmrAudioCtx = null;
        let asmrGain = null;

        function toggleQuartaAudio() {
            const video = document.getElementById('quarta-dobra-video');
            const label = document.getElementById('video-sound-label');
            const icon = document.getElementById('video-sound-icon');
            const dot = document.getElementById('sound-live-dot');

            // Inicializa Ã¡udio ASMR sintetizado do atrito da ponta de tungstÃªnio sobre celulose
            if (!asmrAudioCtx) {
                try {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    asmrAudioCtx = new AudioContext();

                    const bufferSize = asmrAudioCtx.sampleRate * 2;
                    const noiseBuffer = asmrAudioCtx.createBuffer(1, bufferSize, asmrAudioCtx.sampleRate);
                    const output = noiseBuffer.getChannelData(0);
                    let b0 = 0, b1 = 0, b2 = 0;
                    for (let i = 0; i < bufferSize; i++) {
                        const white = Math.random() * 2 - 1;
                        b0 = 0.99886 * b0 + white * 0.0555179;
                        b1 = 0.99332 * b1 + white * 0.0750759;
                        b2 = 0.96900 * b2 + white * 0.1538520;
                        output[i] = (b0 + b1 + b2) * 0.08;
                    }

                    const noiseSource = asmrAudioCtx.createBufferSource();
                    noiseSource.buffer = noiseBuffer;
                    noiseSource.loop = true;

                    const filter = asmrAudioCtx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.value = 2800;
                    filter.Q.value = 1.4;

                    asmrGain = asmrAudioCtx.createGain();
                    asmrGain.gain.setValueAtTime(0, asmrAudioCtx.currentTime);

                    noiseSource.connect(filter);
                    filter.connect(asmrGain);
                    asmrGain.connect(asmrAudioCtx.destination);
                    noiseSource.start(0);
                } catch (e) {
                    console.warn('ASMR Audio Context error:', e);
                }
            }

            if (asmrAudioCtx && asmrAudioCtx.state === 'suspended') {
                asmrAudioCtx.resume();
            }

            const isMuted = !asmrGain || asmrGain.gain.value < 0.01;

            if (isMuted && asmrGain) {
                asmrGain.gain.linearRampToValueAtTime(0.045, asmrAudioCtx.currentTime + 0.3);
                if (label) label.textContent = 'ASMR [32dB ATELIER]';
                if (icon) icon.setAttribute('icon', 'solar:volume-loud-bold');
                if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
            } else if (asmrGain) {
                asmrGain.gain.linearRampToValueAtTime(0, asmrAudioCtx.currentTime + 0.2);
                if (label) label.textContent = 'MUTED [0dB]';
                if (icon) icon.setAttribute('icon', 'solar:muted-bold');
                if (dot) dot.className = 'w-2 h-2 rounded-full bg-zinc-500 transition-colors';
            }
        }

        const penFinishesData = {
            'Carbon Black': {
                name: 'Carbon Black',
                subName: 'Matte Obsidian 100%',
                dotColor: '#141518',
                tintFill: '#141518',
                tintOpacity: 0.95,
                sheenOpacity: 0.50,
                clipOpacity: 1,
                plaqueBg: '#141518',
                plaqueBorder: 'rgba(255, 255, 255, 0.18)',
                textColor: '#f8fafc',
                textShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 1px 3px rgba(0, 0, 0, 0.95)'
            },
            'Pure White': {
                name: 'Pure White',
                subName: 'CerÃ¢mica MonolÃ­tica SuÃ­Ã§a',
                dotColor: '#ffffff',
                tintFill: 'transparent',
                tintOpacity: 0,
                sheenOpacity: 0,
                clipOpacity: 0,
                plaqueBg: '#f7f7f6',
                plaqueBorder: 'rgba(0, 0, 0, 0.08)',
                textColor: '#18181b',
                textShadow: '0 1px 0 rgba(255, 255, 255, 0.9), 0 -1px 0 rgba(0, 0, 0, 0.35)'
            },
            'Prussian Blue': {
                name: 'Prussian Blue',
                subName: 'TitÃ¢nio Mineral Noturno',
                dotColor: '#0c2340',
                tintFill: '#0c2340',
                tintOpacity: 0.92,
                sheenOpacity: 0.55,
                clipOpacity: 1,
                plaqueBg: '#0c2340',
                plaqueBorder: 'rgba(254, 240, 138, 0.25)',
                textColor: '#fef08a',
                textShadow: '0 0 6px rgba(254, 240, 138, 0.7), 0 1px 3px rgba(0, 0, 0, 0.95)'
            },
            'Sepia Archival': {
                name: 'Sepia Archival',
                subName: 'Bronze Champagne Nobre',
                dotColor: '#52361b',
                tintFill: '#52361b',
                tintOpacity: 0.88,
                sheenOpacity: 0.52,
                clipOpacity: 1,
                plaqueBg: '#52361b',
                plaqueBorder: 'rgba(254, 243, 199, 0.25)',
                textColor: '#fef3c7',
                textShadow: '0 0 6px rgba(254, 243, 199, 0.7), 0 1px 3px rgba(0, 0, 0, 0.95)'
            }
        };

        function triggerLaserSweep() {
            const beam = document.getElementById('laser-engrave-beam');
            const spark = document.getElementById('laser-focus-spark');
            if (beam) {
                beam.classList.remove('active');
                void beam.offsetWidth;
                beam.classList.add('active');
            }
            if (spark) {
                spark.classList.remove('active');
                void spark.offsetWidth;
                spark.classList.add('active');
            }
        }

        function handleEngravingInput(val) {
            const display = document.getElementById('live-engraved-text');
            if (display) {
                const cleaned = (val || '').trim();
                if (cleaned) {
                    display.textContent = cleaned.toUpperCase().startsWith('ARTOOLS')
                        ? cleaned.toUpperCase()
                        : `ARTOOLS // ${cleaned.toUpperCase()}`;
                } else {
                    display.textContent = 'ARTOOLS // SIGNATURE';
                }
            }
            triggerLaserSweep();
        }

        function selectNibCaliber(fullLabel, shortLabel, hint, btn) {
            selectedCaliber = fullLabel;
            document.querySelectorAll('.nib-caliber-btn').forEach((b) => {
                b.classList.remove('active', 'border-black', 'bg-black', 'text-white', 'shadow-sm');
                b.classList.add('border-zinc-200', 'bg-zinc-50', 'text-zinc-700');
            });
            if (btn) {
                btn.classList.add('active', 'border-black', 'bg-black', 'text-white', 'shadow-sm');
                btn.classList.remove('border-zinc-200', 'bg-zinc-50', 'text-zinc-700');
            }

            const hudDisp = document.getElementById('hud-nib-display');
            const hudName = document.getElementById('hud-nib-name');
            const specHint = document.getElementById('caliber-spec-hint');

            if (hudDisp) hudDisp.textContent = shortLabel;
            if (hudName) hudName.textContent = `${fullLabel} ${hint.split(' ')[0]}`;
            if (specHint) specHint.textContent = `CalibraÃ§Ã£o SuÃ­Ã§a // ${hint}`;
        }

        function selectInkFormula(name, hex, btn) {
            selectedInk = name;
            document.querySelectorAll('.ink-formula-btn').forEach((b) => {
                b.classList.remove('active', 'border-2', 'border-black', 'shadow-xs');
                b.classList.add('border', 'border-zinc-200');
            });
            if (btn) {
                btn.classList.add('active', 'border-2', 'border-black', 'shadow-xs');
                btn.classList.remove('border', 'border-zinc-200');
            }

            const conf = penFinishesData[name] || penFinishesData['Carbon Black'];

            const hudName = document.getElementById('hud-ink-name');
            const hudDot = document.getElementById('hud-ink-dot');

            if (hudName) hudName.textContent = conf.subName || `${name} 100%`;
            if (hudDot) {
                hudDot.style.backgroundColor = conf.dotColor;
                hudDot.style.borderColor = name === 'Pure White' ? '#d4d4d8' : 'transparent';
            }

            const tintBody = document.getElementById('pen-tint-body');
            const tintSheen = document.getElementById('pen-tint-sheen');
            const tintClip = document.getElementById('pen-tint-clip');

            if (tintBody) {
                tintBody.setAttribute('fill', conf.tintFill);
                tintBody.style.opacity = conf.tintOpacity;
            }
            if (tintSheen) {
                tintSheen.style.opacity = conf.sheenOpacity;
            }
            if (tintClip) {
                tintClip.style.opacity = conf.clipOpacity;
            }

            const plaque = document.getElementById('engraving-plaque-inner');
            const textSpan = document.getElementById('live-engraved-text');
            if (plaque) {
                plaque.style.backgroundColor = conf.plaqueBg;
                plaque.style.borderColor = conf.plaqueBorder;
            }
            if (textSpan) {
                textSpan.style.color = conf.textColor;
                textSpan.style.textShadow = conf.textShadow;
            }

            triggerLaserSweep();
        }

        function testDrySpeed() {
            if (dryTestRunning) return;
            dryTestRunning = true;
            const counter = document.getElementById('dry-time-counter');
            const bar = document.getElementById('dry-progress-bar');

            if (bar) bar.style.width = '0%';
            if (counter) counter.textContent = '0.00';

            let startTime = performance.now();
            const duration = 400; // 400ms para percepÃ§Ã£o visual do 0.04s

            function step(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentSec = (progress * 0.04).toFixed(2);

                if (counter) counter.textContent = currentSec;
                if (bar) bar.style.width = `${progress * 100}%`;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    if (counter) counter.textContent = '0.04';
                    dryTestRunning = false;
                }
            }
            requestAnimationFrame(step);
        }

        function applyConfigurationAndScroll() {
            const engraveVal = document.getElementById('engraving-input-field')?.value.trim() || 'SIGNATURE';
            alert(`ConfiguraÃ§Ã£o Calibrada com Sucesso!\nâ€¢ Calibre: ${selectedCaliber}\nâ€¢ Tinta: ${selectedInk}\nâ€¢ GravaÃ§Ã£o Laser: ${engraveVal.toUpperCase()}\n\nRedirecionando para a reserva com numeraÃ§Ã£o individual suÃ­Ã§a...`);
            scrollToBuy();
        }

        // ExportaÃ§Ã£o explÃ­cita de mÃ©todos para window (Garante acessibilidade global imediata)
        window.selectTechFeature = selectTechFeature;
        window.switchTechVisual = switchTechVisual;
        window.initScratchpad = initScratchpad;
        window.setPadWidth = setPadWidth;
        window.clearPadCanvas = clearPadCanvas;
        window.drawPadDemo = drawPadDemo;
        window.scrollToStage = scrollToStage;
        window.scrollToSecondFold = scrollToSecondFold;
        window.scrollToThirdFold = scrollToThirdFold;
        window.scrollToFourthFold = scrollToFourthFold;
        window.toggleQuartaAudio = toggleQuartaAudio;
        window.scrollToBuy = scrollToBuy;
        window.toggleMixBlend = toggleMixBlend;
        window.handleEngravingInput = handleEngravingInput;
        window.selectNibCaliber = selectNibCaliber;
        window.selectInkFormula = selectInkFormula;
        window.testDrySpeed = testDrySpeed;
        window.applyConfigurationAndScroll = applyConfigurationAndScroll;

        document.addEventListener('DOMContentLoaded', () => {
            // Limpa memÃ³ria de scroll do ScrollTrigger e forÃ§a o topo absoluto
            ScrollTrigger.clearScrollMemory('manual');
            window.scrollTo(0, 0);

            const video = document.getElementById('pen-video');
            const sideProgressFill = document.getElementById('side-progress-fill');
            const stageNumber = document.getElementById('stage-number');

            /* ---------------------------------------------------------------------
               1. ENTRADA SUAVE COM GSAP.FROM() NO CARREGAMENTO DA PÃGINA
               --------------------------------------------------------------------- */
            const introTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

            introTl.from('#navbar', {
                y: -24,
                opacity: 0,
                duration: 1.1
            }, 0);

            introTl.from('#video-stage-parallax', {
                scale: 1.05,
                opacity: 0,
                duration: 1.4,
                ease: 'power3.out'
            }, 0);

            introTl.from('.gsap-intro', {
                y: 36,
                opacity: 0,
                stagger: 0.1,
                duration: 1.25,
                clearProps: 'transform,opacity'
            }, 0.15);

            /* ---------------------------------------------------------------------
               2. MOTOR DE VÃDEO 60FPS HARDWARE-ACCELERATED (INTRA-FRAME SCRUB):
               - Como todos os frames sÃ£o keyframes independentes (I-frames),
                 a decodificaÃ§Ã£o direta de currentTime leva 1 a 2 milissegundos.
               - O listener 'seeked' garante atualizaÃ§Ã£o instantÃ¢nea sem fila de espera.
               --------------------------------------------------------------------- */
            let videoDuration = 7.85;
            let targetVideoTime = 0;

            video.addEventListener('seeked', () => {
                if (Math.abs(video.currentTime - targetVideoTime) > 0.015) {
                    video.currentTime = targetVideoTime;
                }
            });

            function syncVideoTime(time) {
                targetVideoTime = Math.min(Math.max(time, 0), Math.max(videoDuration - 0.02, 0.05));
                if (!video.seeking) {
                    video.currentTime = targetVideoTime;
                }
            }

            /* ---------------------------------------------------------------------
               3. SCROLLTRIGGER PIN + TIMELINE DE PARALLAX MULTICAMADA ESTILO APPLE
               --------------------------------------------------------------------- */
            let isScrollInitialized = false;

            function initAppleParallaxAndScrub() {
                if (isScrollInitialized) return;
                if (!video.duration || isNaN(video.duration)) return;
                isScrollInitialized = true;

                videoDuration = video.duration;
                video.pause();
                video.currentTime = 0;

                // Garante que o scroll continue no topo antes de construir o ScrollTrigger
                window.scrollTo(0, 0);

                // Timeline Mestre atrelada ao ScrollTrigger com Pin
                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#hero-pin-section',
                        start: 'top top',
                        end: '+=420%', // Pista de rolagem ampla para controle milimÃ©trico do vÃ­deo
                        pin: true,
                        scrub: 0.35,   // Amortecimento sedoso estilo Apple
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const time = self.progress * (videoDuration - 0.02);
                            syncVideoTime(time);

                            // Atualiza barra lateral de progresso
                            if (sideProgressFill) {
                                sideProgressFill.style.transform = `scaleY(${self.progress})`;
                            }
                            if (stageNumber) {
                                stageNumber.textContent = self.progress < 0.36 ? '01' : (self.progress < 0.70 ? '02' : '03');
                            }
                        }
                    }
                });

                masterScrollTrigger = masterTl.scrollTrigger;

                // A. Parallax da Marca d'Ãgua Gigante ao Fundo (Deslocamento suave)
                masterTl.fromTo('#bg-watermark-parallax',
                    { xPercent: 8, yPercent: 10 },
                    { xPercent: -14, yPercent: -12, ease: 'none', duration: 100 },
                    0
                );

                // B. Parallax Ã“ptico no Palco do VÃ­deo (Leve zoom dinÃ¢mico no meio do giro)
                masterTl.fromTo('#video-stage-parallax',
                    { scale: 1, yPercent: 0 },
                    { scale: 1.05, yPercent: -2, ease: 'sine.inOut', duration: 50 },
                    0
                ).to('#video-stage-parallax',
                    { scale: 1.01, yPercent: 0, ease: 'sine.inOut', duration: 50 },
                    50
                );

                // C. ESTÃGIO 1 (0 -> 36): Parallax Diferencial de SaÃ­da (Cada elemento em velocidade prÃ³pria)
                masterTl.to('#p1-badge', { y: -150, opacity: 0, ease: 'power2.in', duration: 22 }, 14);
                masterTl.to('#p1-title', { y: -120, opacity: 0, filter: 'blur(6px)', ease: 'power2.in', duration: 24 }, 15);
                masterTl.to('#p1-desc',  { y: -85,  opacity: 0, filter: 'blur(4px)', ease: 'power2.in', duration: 22 }, 17);
                masterTl.to('#p1-cta',   { y: -55,  opacity: 0, ease: 'power2.in', duration: 20 }, 19);

                // D. ESTÃGIO 2 (34 -> 70): Entrada e SaÃ­da em Parallax AssimÃ©trico (Cards Bento Flutuantes)
                masterTl.to('#stage-2', { opacity: 1, duration: 1 }, 33);
                masterTl.fromTo('#p2-left',
                    { y: 130, opacity: 0, filter: 'blur(6px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 16 },
                    34
                );
                masterTl.fromTo('#p2-right',
                    { y: 210, opacity: 0, filter: 'blur(6px)' },
                    { y: -20, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 18 },
                    36
                );

                // SaÃ­da em Parallax do EstÃ¡gio 2
                masterTl.to('#p2-left',  { y: -130, opacity: 0, filter: 'blur(6px)', ease: 'power2.in', duration: 15 }, 56);
                masterTl.to('#p2-right', { y: -190, opacity: 0, filter: 'blur(6px)', ease: 'power2.in', duration: 15 }, 57);
                masterTl.to('#stage-2',  { opacity: 0, duration: 1 }, 71);

                // E. ESTÃGIO 3 (68 -> 100): Entrada em Parallax da Ponta 0.18mm & Bento Specs
                masterTl.to('#stage-3', { opacity: 1, duration: 1 }, 68);
                masterTl.fromTo('#p3-left',
                    { y: 120, opacity: 0, filter: 'blur(6px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', ease: 'power3.out', duration: 18 },
                    69
                );
                masterTl.fromTo('#p3-right',
                    { y: 170, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, ease: 'power3.out', duration: 20 },
                    72
                );

                // Garante que a pÃ¡gina inicie no topo e recalcula os offsets
                window.scrollTo(0, 0);
                ScrollTrigger.refresh();
            }

            // InicializaÃ§Ã£o atrelada ao carregamento de metadados do vÃ­deo
            if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
                initAppleParallaxAndScrub();
            } else {
                video.addEventListener('loadedmetadata', initAppleParallaxAndScrub, { once: true });
                video.addEventListener('canplay', initAppleParallaxAndScrub, { once: true });
            }

            video.load();

            /* ---------------------------------------------------------------------
               4. MICRO-INTERAÃ‡Ã•ES: HOVER MAGNÃ‰TICO & CARDS FLASHLIGHT
               --------------------------------------------------------------------- */
            const magneticBtns = document.querySelectorAll('.magnetic-btn');
            magneticBtns.forEach((btn) => {
                const strength = parseFloat(btn.dataset.strength || '0.28');
                const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
                const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const relX = e.clientX - (rect.left + rect.width / 2);
                    const relY = e.clientY - (rect.top + rect.height / 2);
                    xTo(relX * strength);
                    yTo(relY * strength);
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' });
                });
            });

            const flashlightCards = document.querySelectorAll('.flashlight-card, .flashlight-glow-box');
            flashlightCards.forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                });
            });

            // Garante autoplay contÃ­nuo do vÃ­deo de fundo da Quarta Dobra e sincronizaÃ§Ã£o do timecode
            const quartaVideo = document.getElementById('quarta-dobra-video');
            const timecodeEl = document.getElementById('video-timecode');
            if (quartaVideo) {
                quartaVideo.play().catch(() => {});
                quartaVideo.addEventListener('timeupdate', () => {
                    if (timecodeEl && quartaVideo.duration) {
                        const cur = Math.floor(quartaVideo.currentTime);
                        const dur = Math.floor(quartaVideo.duration);
                        const curStr = cur < 10 ? `0${cur}` : `${cur}`;
                        const durStr = dur < 10 ? `0${dur}` : `${dur}`;
                        timecodeEl.textContent = `00:${curStr} / 00:${durStr}`;
                    }
                });
            }

            /* ---------------------------------------------------------------------
               5. SEGUNDA DOBRA E SEÃ‡Ã•ES SUBSEQUENTES: SISTEMA DE REVELAÃ‡ÃƒO INFALÃVEL
               - AtivaÃ§Ã£o de .reveal-up e .reveal-zoom via ScrollTrigger com once: true
               - Garante que NUNCA haja tela branca (elimina toggleActions reversas)
               --------------------------------------------------------------------- */
            // 5.1 ScrollTrigger para todas as seÃ§Ãµes (Entrada suave e permanente)
            gsap.utils.toArray('.reveal-up, .reveal-zoom').forEach(function (elem) {
                ScrollTrigger.create({
                    trigger: elem,
                    start: "top 88%",
                    once: true,
                    onEnter: function () {
                        elem.classList.add('active');
                    }
                });
            });

            // 5.2 Lupa Ã“ptica Interativa e Tilt 3D no Card de Vitrine Macro
            const techCard = document.getElementById('tech-feature-card');
            const techImg = document.getElementById('tech-feature-img');
            const coordsVal = document.getElementById('macro-coords-val');

            if (techCard && techImg) {
                const rotX = gsap.quickTo(techCard, 'rotationX', { duration: 0.5, ease: 'power3.out' });
                const rotY = gsap.quickTo(techCard, 'rotationY', { duration: 0.5, ease: 'power3.out' });

                techCard.addEventListener('mousemove', (e) => {
                    const rect = techCard.getBoundingClientRect();
                    const normX = (e.clientX - rect.left) / rect.width - 0.5;
                    const normY = (e.clientY - rect.top) / rect.height - 0.5;

                    // 3D Tilt suave
                    rotY(normX * 6);
                    rotX(-normY * 6);

                    // Efeito de Lupa Ã“ptica 10x no modo Macro
                    if (activeVisualMode === 'macro') {
                        const xPercent = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 4), 96);
                        const yPercent = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 4), 96);
                        techImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                        techImg.style.transform = 'scale(1.32)';

                        if (coordsVal) {
                            const microX = ((e.clientX - rect.left) * 1.82).toFixed(1);
                            const microY = ((e.clientY - rect.top) * 1.82).toFixed(1);
                            coordsVal.textContent = `OPTICAL 10X // X:${microX}Âµm Y:${microY}Âµm`;
                        }
                    }
                });

                techCard.addEventListener('mouseleave', () => {
                    rotX(0);
                    rotY(0);
                    if (activeVisualMode === 'macro') {
                        techImg.style.transform = 'scale(1)';
                        techImg.style.transformOrigin = 'center center';
                        if (coordsVal) coordsVal.textContent = 'OPTICAL MACRO 10X // Â±0.0008mm';
                    }
                });
            }

            // 5.3 InicializaÃ§Ã£o Antecipada da Prancheta Interativa
            initScratchpad();

            // 5.4 Garantia InfalÃ­vel contra Tela Branca: Ativa elementos visÃ­veis apÃ³s 600ms
            setTimeout(() => {
                document.querySelectorAll('.reveal-up, .reveal-zoom').forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight + 150) {
                        el.classList.add('active');
                    }
                });
            }, 600);
        });

        // =========================================================================
        // 6. MICRO-INTERAÃ‡Ã•ES: BARRA DE LEITURA, FUSO HORÃRIO DUPLO & VALIDADOR
        // =========================================================================
        function updateScrollProgressBar() {
            const bar = document.getElementById('header-scroll-progress');
            if (!bar) return;
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollTotal > 0) {
                const pct = Math.min(Math.max((window.scrollY / scrollTotal) * 100, 0), 100);
                bar.style.width = `${pct}%`;
            }
        }
        window.addEventListener('scroll', updateScrollProgressBar, { passive: true });

        function updateDualClocks() {
            try {
                const now = new Date();
                const zrhFormatter = new Intl.DateTimeFormat('pt-BR', {
                    timeZone: 'Europe/Zurich',
                    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                });
                const spFormatter = new Intl.DateTimeFormat('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                });
                const zrhStr = zrhFormatter.format(now);
                const spStr = spFormatter.format(now);

                const zrhEl = document.getElementById('zurich-live-clock');
                const zrhFootEl = document.getElementById('clock-zurich-footer');
                const spFootEl = document.getElementById('clock-sp-footer');

                if (zrhEl) zrhEl.textContent = zrhStr;
                if (zrhFootEl) zrhFootEl.textContent = zrhStr;
                if (spFootEl) spFootEl.textContent = spStr;
            } catch (e) {}
        }
        setInterval(updateDualClocks, 1000);
        updateDualClocks();

        // Validador de NÃºmero de SÃ©rie no Footer
        function validateSerialNumber(val) {
            const icon = document.getElementById('serial-status-icon');
            const msg = document.getElementById('serial-validation-msg');
            const trimmed = (val || '').trim().toUpperCase();
            if (!trimmed) {
                if (icon) {
                    icon.setAttribute('icon', 'solar:check-circle-bold');
                    icon.className = 'text-zinc-500 text-sm';
                }
                if (msg) {
                    msg.textContent = '* Digite para consultar a autenticidade da sÃ©rie';
                    msg.className = 'text-[10px] font-mono text-zinc-500';
                }
                return;
            }
            if (icon) {
                icon.setAttribute('icon', 'solar:shield-check-bold');
                icon.className = 'text-emerald-400 text-sm animate-pulse';
            }
            if (msg) {
                msg.textContent = `âœ“ REGISTRO VALIDADO: ${trimmed} â€¢ TOLERÃ‚NCIA SUÃÃ‡A Â±0.0008MM HOMOLOGADA`;
                msg.className = 'text-[10px] font-mono text-emerald-400 font-semibold';
            }
            playPenStrokeSound(0.4);
        }

        // Garantia adicional contra rolagem residual em reloads
        window.addEventListener('load', () => {
            window.scrollTo(0, 0);
        });

        window.addEventListener('beforeunload', () => {
            window.scrollTo(0, 0);
        });
