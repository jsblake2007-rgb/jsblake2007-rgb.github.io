/* ============================================================
   DECODE THE WEB — interactions
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero entrance ---------- */
  window.addEventListener("load", () => document.body.classList.add("loaded"));

  /* ---------- navbar scroll state + progress bar ---------- */
  const nav = document.getElementById("nav");
  const progressBar = document.getElementById("progressBar");

  const onScrollUi = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScrollUi, { passive: true });
  onScrollUi();

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");

  const setMenu = (open) => {
    burger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- whatsapp share ---------- */
  const waShare = document.getElementById("waShare");
  if (waShare) {
    const isLive = location.protocol.startsWith("http");
    const msg = isLive
      ? `Check out this site I built — ${document.title}: ${location.href}`
      : `Check out this site I built — ${document.title}! (Ask me for the link or the zip.)`;
    waShare.href = "https://wa.me/?text=" + encodeURIComponent(msg);
  }

  /* ---------- scroll reveals ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach((el) => {
    const d = el.dataset.delay;
    if (d) el.style.setProperty("--rd", d + "ms");
  });
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- animated counters ---------- */
  const formatCount = (n) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    return String(Math.round(n));
  };

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        counterObserver.unobserve(el);

        if (reduceMotion) {
          el.textContent = formatCount(target) + suffix;
          return;
        }
        const start = performance.now();
        const dur = 1600;
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = formatCount(target * eased) + (t === 1 ? suffix : "");
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- parallax orbs ---------- */
  const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
  if (!reduceMotion && parallaxEls.length) {
    let ticking = false;
    const applyParallax = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        el.style.translate = `0 ${y * Number(el.dataset.parallax) * -1}px`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
  }

  /* ---------- magnetic buttons ---------- */
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (fine && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    /* ---------- 3D tilt cards ---------- */
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${py * -7}deg) rotateY(${px * 9}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- crash course: lessons + live editor ---------- */
  const courseEl = document.getElementById("course");
  if (courseEl) {
    const lessons = {
      html: {
        file: "index.html",
        title: "HTML — the skeleton",
        text: "HTML (HyperText Markup Language) gives a page its structure. Everything you see on " +
          "the web — headings, paragraphs, links, images — is an HTML element wrapped in tags.",
        points: [
          "Change the heading text and watch the preview",
          "Add your own list item",
          "Point the link somewhere real, like https://example.com",
        ],
        code: [
          '<!-- HTML is structure. Edit anything — the preview',
          '     on the right rebuilds as you type. -->',
          '',
          '<h1>Hello, web! 👋</h1>',
          '<p>This paragraph is an HTML element. So is everything else here.</p>',
          '',
          '<h2>Things to try</h2>',
          '<ul>',
          '  <li>Change the big heading above</li>',
          '  <li>Add another list item below this one</li>',
          '  <li>Visit <a href="https://example.com">a link</a></li>',
          '</ul>',
        ].join("\n"),
      },
      css: {
        file: "styles.css",
        title: "CSS — the style",
        text: "CSS (Cascading Style Sheets) controls how HTML looks: colors, spacing, fonts, layout, " +
          "and motion. A rule selects an element and declares its style.",
        points: [
          "Change the h1 color — try hotpink or #4ade80",
          "Round the card more: border-radius: 30px",
          "Make the border dashed instead of solid",
        ],
        code: [
          '<style>',
          '  body {',
          '    font-family: sans-serif;',
          '    background: #0b1020;',
          '    color: #eaf0ff;',
          '    padding: 24px;',
          '  }',
          '  h1 { color: #22d3ee; }',
          '  .card {',
          '    background: #171f38;',
          '    border: 2px solid #8b5cf6;',
          '    border-radius: 12px;',
          '    padding: 18px;',
          '  }',
          '</style>',
          '',
          '<h1>CSS is the style layer</h1>',
          '<div class="card">',
          '  <p>This box is styled by the .card rule above.',
          '     Change a value and watch it react.</p>',
          '</div>',
        ].join("\n"),
      },
      js: {
        file: "script.js",
        title: "JavaScript — the behavior",
        text: "JavaScript makes pages interactive. It listens for events (clicks, keys, scrolls) and " +
          "changes the page in response — no reload required.",
        points: [
          "Click the button in the preview",
          "Change the message the counter prints",
          "Make it count by 10s instead of 1s",
        ],
        code: [
          '<style>',
          '  body { font-family: sans-serif; background: #0b1020;',
          '         color: #eaf0ff; padding: 24px; text-align: center; }',
          '  button { font-size: 1rem; padding: 12px 24px; border: none;',
          '           border-radius: 999px; cursor: pointer;',
          '           background: #22d3ee; color: #06121a; font-weight: bold; }',
          '  #out { font-size: 1.4rem; margin-top: 16px; }',
          '</style>',
          '',
          '<h1>JavaScript reacts</h1>',
          '<button id="btn">Click me</button>',
          '<p id="out">0 clicks so far</p>',
          '',
          '<script>',
          '  let count = 0;',
          '  document.getElementById("btn").onclick = () => {',
          '    count = count + 1;',
          '    document.getElementById("out").textContent =',
          '      count + " clicks so far";',
          '  };',
          '<\/script>',
        ].join("\n"),
      },
    };

    const tabs = courseEl.querySelectorAll(".course__tab");
    const codeInput = document.getElementById("codeInput");
    const preview = document.getElementById("preview");
    const lessonTitle = document.getElementById("lessonTitle");
    const lessonText = document.getElementById("lessonText");
    const lessonPoints = document.getElementById("lessonPoints");
    const editorFile = document.getElementById("editorFile");
    const resetBtn = document.getElementById("resetCode");

    let current = "html";
    const edits = {};
    let previewTimer;

    const renderPreview = () => { preview.srcdoc = codeInput.value; };
    const queuePreview = () => {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(renderPreview, 250);
    };

    const showLesson = (key) => {
      if (codeInput.value) edits[current] = codeInput.value;
      current = key;
      const l = lessons[key];
      tabs.forEach((t) => {
        const on = t.dataset.lesson === key;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", String(on));
      });
      lessonTitle.textContent = l.title;
      lessonText.textContent = l.text;
      lessonPoints.innerHTML = l.points
        .map((p) => `<li><strong>Try:</strong> ${p}</li>`).join("");
      editorFile.textContent = l.file;
      codeInput.value = edits[key] !== undefined ? edits[key] : l.code;
      renderPreview();
    };

    tabs.forEach((t) => t.addEventListener("click", () => showLesson(t.dataset.lesson)));
    codeInput.addEventListener("input", queuePreview);
    resetBtn.addEventListener("click", () => {
      delete edits[current];
      codeInput.value = lessons[current].code;
      renderPreview();
    });

    // Tab key indents instead of leaving the editor
    codeInput.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const { selectionStart: s, selectionEnd: en, value } = codeInput;
        codeInput.value = value.slice(0, s) + "  " + value.slice(en);
        codeInput.selectionStart = codeInput.selectionEnd = s + 2;
        queuePreview();
      }
    });

    showLesson("html");

    /* ---------- crash course: quiz ---------- */
    const questions = [
      {
        q: "Which language controls how a page looks — colors, fonts, layout?",
        opts: ["HTML", "CSS", "JavaScript", "TCP/IP"],
        a: 1,
        why: "CSS is the style layer. HTML provides structure, JavaScript provides behavior.",
      },
      {
        q: "A data packet is lost on its way to the server. What notices and fixes that?",
        opts: ["The router", "Your ISP", "TCP", "The web browser"],
        a: 2,
        why: "TCP guarantees every packet arrives intact and in order — re-requesting any that go missing. IP handles the addressing.",
      },
      {
        q: "A developer who builds both the interface and the server logic is called…",
        opts: ["A front-end developer", "A back-end developer", "A full-stack developer", "A DevOps engineer"],
        a: 2,
        why: "Full-stack developers move between front-end (what users see) and back-end (servers, databases, APIs).",
      },
      {
        q: "Which cloud tier hands you a finished app in the browser — upgrades and patching included?",
        opts: ["IaaS", "PaaS", "Serverless", "SaaS"],
        a: 3,
        why: "Software as a Service is the top of the stack: the provider runs everything, you just sign in and use it.",
      },
      {
        q: "Which tool acts like a time machine for your code?",
        opts: ["VS Code", "Git", "Chrome DevTools", "Stack Overflow"],
        a: 1,
        why: "Git is version control — every commit is a snapshot you can return to, so you can experiment without fear.",
      },
    ];

    const quizBody = document.getElementById("quizBody");
    const quizFill = document.getElementById("quizFill");
    const quizCount = document.getElementById("quizCount");
    let qIndex = 0;
    let score = 0;

    const renderQuestion = () => {
      const item = questions[qIndex];
      quizCount.textContent = `question ${qIndex + 1} / ${questions.length}`;
      quizFill.style.width = (qIndex / questions.length) * 100 + "%";
      quizBody.innerHTML = `
        <p class="quiz__question">${item.q}</p>
        <div class="quiz__opts">
          ${item.opts.map((o, i) =>
            `<button class="quiz__opt" type="button" data-i="${i}">${o}</button>`).join("")}
        </div>
        <div class="quiz__after"></div>`;

      quizBody.querySelectorAll(".quiz__opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          const picked = Number(btn.dataset.i);
          const right = picked === item.a;
          if (right) score++;
          quizBody.querySelectorAll(".quiz__opt").forEach((b, i) => {
            b.disabled = true;
            if (i === item.a) b.classList.add("correct");
            else if (i === picked) b.classList.add("wrong");
          });
          quizBody.querySelector(".quiz__after").innerHTML = `
            <div class="quiz__why"><strong>${right ? "Correct." : "Not quite."}</strong> ${item.why}</div>
            <button class="btn btn--primary quiz__next" type="button">
              ${qIndex + 1 < questions.length ? "Next question →" : "See my score →"}
            </button>`;
          quizBody.querySelector(".quiz__next").addEventListener("click", () => {
            qIndex++;
            if (qIndex < questions.length) renderQuestion();
            else renderResult();
          });
        });
      });
    };

    const renderResult = () => {
      quizFill.style.width = "100%";
      quizCount.textContent = "complete";
      const verdicts = [
        "Worth another lap through the lessons — they're short.",
        "Solid start. Re-skim the sections you missed and retake it.",
        "Good grasp of the fundamentals. Keep going.",
        "Strong. You're ready for The Odin Project.",
        "Perfect score — go build something.",
      ];
      const verdict = verdicts[Math.min(score, verdicts.length - 1)];
      quizBody.innerHTML = `
        <div class="quiz__result">
          <p class="quiz__score">${score}/${questions.length}</p>
          <p class="quiz__verdict">${verdict}</p>
          <button class="btn btn--ghost" type="button" id="quizRetry">↺ Try again</button>
        </div>`;
      document.getElementById("quizRetry").addEventListener("click", () => {
        qIndex = 0; score = 0; renderQuestion();
      });
    };

    renderQuestion();
  }

  /* ---------- interactive starfield background ---------- */
  const canvas = document.getElementById("net");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, nodes, moons;
    const mouse = { x: -9999, y: -9999 };
    const sparks = [];
    const rings = [];
    const LINK_DIST = 150;
    const CLICK_RADIUS = 30;

    const spawnStar = (fadeIn) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8,
      a: fadeIn ? 0 : 1,
      tw: Math.random() * Math.PI * 2, // twinkle phase
    });

    const spawnMoons = () => {
      const count = w > 700 ? 3 : 2;
      moons = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: h * (0.15 + (0.7 / count) * i + Math.random() * 0.1),
        r: 14 + Math.random() * 16,
        vx: 0.05 + Math.random() * 0.08,
        bob: Math.random() * Math.PI * 2,
      }));
    };

    const setSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const populate = () => {
      const count = Math.min(Math.floor((w * h) / 16000), 110);
      nodes = Array.from({ length: count }, () => spawnStar(false));
      spawnMoons();
    };
    setSize();
    populate();

    // On mobile, the URL bar showing/hiding fires resize with small height
    // changes — keep the same stars then, only repopulate on real resizes.
    window.addEventListener("resize", () => {
      const prevW = w, prevH = h;
      setSize();
      if (w !== prevW || Math.abs(h - prevH) > 150) populate();
    });

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    /* click a star -> it bursts into white flame and is reborn elsewhere */
    const explode = (x, y) => {
      const n = 16 + Math.floor(Math.random() * 8);
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.6;
        sparks.push({
          x, y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed - 0.4,
          life: 1,
          decay: 0.012 + Math.random() * 0.02,
          r: 0.8 + Math.random() * 1.6,
        });
      }
      rings.push({ x, y, r: 2, alpha: 0.8 });
    };

    window.addEventListener("click", (e) => {
      let best = null, bestD = CLICK_RADIUS;
      for (const s of nodes) {
        const d = Math.hypot(e.clientX - s.x, e.clientY - s.y);
        if (d < bestD) { bestD = d; best = s; }
      }
      if (best) {
        explode(best.x, best.y);
        Object.assign(best, spawnStar(true));
      }
    });

    const drawMoon = (m, t) => {
      m.x += m.vx;
      if (m.x > w + m.r * 3) m.x = -m.r * 3;
      const y = m.y + Math.sin(t / 2400 + m.bob) * 6;

      const halo = ctx.createRadialGradient(m.x, y, m.r * 0.4, m.x, y, m.r * 2.6);
      halo.addColorStop(0, "rgba(226, 232, 240, 0.14)");
      halo.addColorStop(1, "rgba(226, 232, 240, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(m.x, y, m.r * 2.6, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "rgba(212, 220, 234, 0.85)";
      ctx.beginPath(); ctx.arc(m.x, y, m.r, 0, Math.PI * 2); ctx.fill();

      // shadow clipped to the moon body -> crescent
      ctx.save();
      ctx.beginPath(); ctx.arc(m.x, y, m.r, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = "rgba(5, 7, 15, 0.85)";
      ctx.beginPath();
      ctx.arc(m.x - m.r * 0.42, y - m.r * 0.2, m.r * 0.95, 0, Math.PI * 2);
      ctx.fill();
      // a couple of craters on the lit edge
      ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
      ctx.beginPath(); ctx.arc(m.x + m.r * 0.45, y + m.r * 0.25, m.r * 0.13, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(m.x + m.r * 0.2, y + m.r * 0.55, m.r * 0.09, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    };

    const frame = (t) => {
      requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);

      for (const m of moons) drawMoon(m, t || 0);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (n.a < 1) n.a = Math.min(1, n.a + 0.02);

        // gentle pull toward the cursor
        const mdx = mouse.x - n.x, mdy = mouse.y - n.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < 200 && mDist > 0.001) {
          n.x += (mdx / mDist) * 0.25;
          n.y += (mdy / mDist) * 0.25;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.35 * a.a * b.a;
            ctx.strokeStyle = `rgba(99, 179, 237, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const twinkle = 0.7 + Math.sin((t || 0) / 600 + n.tw) * 0.3;
        ctx.globalAlpha = n.a * twinkle;
        ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // white-flame sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.vy -= 0.012;            // flames rise
        s.vx *= 0.985; s.vy *= 0.985;
        s.life -= s.decay;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }

        ctx.globalAlpha = s.life * 0.45;
        ctx.fillStyle = "rgba(255, 214, 150, 1)"; // warm outer glow
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 2.4, 0, Math.PI * 2); ctx.fill();

        ctx.globalAlpha = s.life;
        ctx.fillStyle = "#ffffff";                // white-hot core
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // shockwave rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.r += 1.6; r.alpha -= 0.028;
        if (r.alpha <= 0) { rings.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke();
      }
    };
    requestAnimationFrame(frame);
  }
})();
