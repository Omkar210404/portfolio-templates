/* ============ EDIT YOUR CONTENT HERE ============ */
const DATA = {
  name: 'Your Name', role: 'AI/ML Engineer (Fresher)', location: 'City, Country',
  tagline: 'I build practical machine learning and API projects with Python.',
  about: [
    'Write two or three sentences about what you build and what role you want. Mention real tools and real projects.',
    'Add a second paragraph if you like: what you are learning now, or how you work.'
  ],
  skills: {
    Languages: ['Python', 'SQL', 'JavaScript'],
    'ML and data': ['scikit-learn', 'pandas', 'NumPy', 'Transformers'],
    Backend: ['FastAPI', 'Docker', 'REST APIs'],
    Tools: ['Git', 'GitHub', 'Streamlit']
  },
  experience: [
    { when: '2026', role: 'Role or internship title', org: 'Company name', note: 'One or two lines on what you did. Only list real experience.' },
    { when: '2025', role: 'Course, certification, or project', org: 'Organisation', note: 'One or two lines on what you did.' },
    { when: '2022', role: 'B.E. Computer Engineering', org: 'University name', note: 'Degree, field, and anything worth noting.' }
  ],
  /* The skills chart counts how many projects list each skill in `tags`, so keep tags matching skill names. */
  projects: [
    { name: 'Project One', year: '2026', desc: 'What it does, who it is for, and what you built.', tags: ['Python', 'FastAPI', 'Docker'], url: '#' },
    { name: 'Project Two', year: '2026', desc: 'What it does, who it is for, and what you built.', tags: ['Python', 'scikit-learn', 'pandas', 'Streamlit'], url: '#' },
    { name: 'Project Three', year: '2025', desc: 'What it does, who it is for, and what you built.', tags: ['Python', 'Transformers', 'Streamlit'], url: '#' }
  ],
  contact: { email: 'you@email.com', accessKey: 'YOUR_ACCESS_KEY', links: [['GitHub', 'https://github.com/'], ['LinkedIn', 'https://linkedin.com/in/']] }
};
/* ================================================ */

const $ = s => document.querySelector(s), root = document.documentElement;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const q = JSON.stringify, reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------- tiny Python syntax highlighter ---------- */
const RE = /(#.*)|("(?:[^"\\]|\\.)*")|\b(import|from|as|def|return|True|False|None|for|in)\b|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)(?=\()/g;
function hl(s) {
  let o = '', i = 0, m; RE.lastIndex = 0;
  while ((m = RE.exec(s))) {
    o += esc(s.slice(i, m.index));
    o += `<span class="t${m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'n' : 'f'}">${esc(m[0])}</span>`;
    i = RE.lastIndex;
  }
  return o + esc(s.slice(i));
}

/* ---------- output builders ---------- */
const uses = s => DATA.projects.filter(p => p.tags.some(t => t.toLowerCase() === s.toLowerCase())).length;
const outAbout = () => DATA.about.map(p => `<p>${esc(p)}</p>`).join('');
function outSkills() {
  const used = Object.values(DATA.skills).flat().map(s => [s, uses(s)]).filter(a => a[1] > 0).sort((a, b) => b[1] - a[1]);
  const ps = [...DATA.projects].sort((a, b) => b.year - a.year), R = 34, H = Math.max(used.length, ps.length, 1) * R + 24;
  const y = (i, n) => 12 + (H - 24 - n * R) / 2 + i * R + R / 2;
  let lines = '', nodes = '';
  ps.forEach((p, j) => used.forEach(([s], i) => { if (p.tags.some(t => t.toLowerCase() === s.toLowerCase())) { const y1 = y(i, used.length), y2 = y(j, ps.length); lines += `<path class="ln" data-s="${esc(s)}" data-p="${esc(p.name)}" d="M165 ${y1}C320 ${y1} 320 ${y2} 475 ${y2}"/>`; } }));
  used.forEach(([s, n], i) => { nodes += `<g class="nd" data-n="${esc(s)}" tabindex="0"><circle cx="165" cy="${y(i, used.length)}" r="5.5"/><text x="152" y="${y(i, used.length) + 4}" text-anchor="end">${esc(s)} <tspan class="ct">${n}</tspan></text></g>`; });
  ps.forEach((p, j) => { nodes += `<g class="nd p" data-n="${esc(p.name)}" tabindex="0"><circle cx="475" cy="${y(j, ps.length)}" r="5.5"/><text x="488" y="${y(j, ps.length) + 4}">${esc(p.name)}</text></g>`; });
  return `<svg class="gr" viewBox="0 0 660 ${H}" role="img" aria-label="Which skills were used in which projects"><defs><linearGradient id="lg" gradientUnits="userSpaceOnUse" x1="165" y1="0" x2="475" y2="0"><stop offset="0" stop-color="var(--a1)"/><stop offset="1" stop-color="var(--a3)"/></linearGradient></defs>${lines}${nodes}</svg>` +
    `<p class="cap">Skills (left) connect to the projects that list them in their tags (right). Hover or focus a node to trace its links.</p>` +
    `<div class="grp">${Object.entries(DATA.skills).map(([g, a]) => `<div><h4>${esc(g)}</h4><ul class="chips">${a.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>`).join('')}</div>`;
}
const outExp = () => `<ol class="tl">${DATA.experience.map(e => `<li><span class="yr">${esc(e.when)}</span><h3>${esc(e.role)}</h3><p class="org">${esc(e.org)}</p><p class="nt">${esc(e.note)}</p></li>`).join('')}</ol>`;
function art(n, k) {
  let h = [...n].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7); const r = () => (h = (h * 1664525 + 1013904223) >>> 0) / 4294967296, hu = Math.floor(r() * 360);
  let s = `<svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="ag${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hu} 85% 58%)"/><stop offset="1" stop-color="hsl(${(hu + 70) % 360} 80% 30%)"/></linearGradient></defs><rect width="320" height="150" fill="url(#ag${k})"/>`;
  for (let i = 0; i < 4; i++) s += `<circle cx="${r() * 320 | 0}" cy="${r() * 150 | 0}" r="${20 + r() * 50 | 0}" fill="#fff" fill-opacity="${(.05 + r() * .12).toFixed(2)}"/>`;
  for (let i = 0; i < 5; i++) { const x = r() * 320 | 0; s += `<path d="M${x} 0L${x - 60} 150" stroke="#fff" stroke-opacity=".14" stroke-width="${1 + r() * 2 | 0}"/>`; }
  return s + `<text x="18" y="126" font-size="64" font-weight="700" fill="#fff" fill-opacity=".92" font-family="IBM Plex Sans,sans-serif" letter-spacing="-3">${esc(n.split(' ').map(w => w[0]).join('').slice(0, 3))}</text></svg>`;
}
const outProjects = () => `<div class="pcs">${[...DATA.projects].sort((a, b) => b.year - a.year).map((p, i) => `<a class="pc" href="${esc(p.url)}" target="_blank" rel="noopener"><div class="art">${art(p.name, i)}</div><div class="pb"><span class="yr">${esc(p.year)}</span><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><ul class="chips">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></a>`).join('')}</div>`;
const outContact = () => `<form class="wg" id="form" action="https://api.web3forms.com/submit" method="POST" novalidate>
<input type="hidden" name="access_key" value="${esc(DATA.contact.accessKey)}"><input type="hidden" name="from_name" value="Portfolio notebook">
<input type="checkbox" name="botcheck" class="bot" tabindex="-1" autocomplete="off" aria-hidden="true">
<label>name<input name="name" required autocomplete="name"></label><label>email<input name="email" type="email" required autocomplete="email"></label>
<label>message<textarea name="message" rows="4" required></textarea></label>
<button class="wbtn" type="submit">Send</button><p class="st" id="status" role="status"></p></form>
<div class="lnk"><a href="mailto:${esc(DATA.contact.email)}">${esc(DATA.contact.email)}</a>${DATA.contact.links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join('')}</div>`;

/* ---------- notebook structure ---------- */
const SECTIONS = ['about', 'skills', 'experience', 'projects', 'contact'];
const CELLS = [
  { cls: 'hero', md: `<h1>${esc(DATA.name)}</h1><p class="sub">${esc(DATA.role)} · ${esc(DATA.location)}</p><p>${esc(DATA.tagline)}</p><nav class="toc" aria-label="Sections">${SECTIONS.map(s => `<a href="#${s}">${s[0].toUpperCase() + s.slice(1)}</a>`).join('')}</nav><p class="tip">Press <kbd>Shift</kbd> + <kbd>Enter</kbd> on a cell to run it. Cells run automatically on load.</p>` },
  { id: 'about', md: '<h2>About</h2>' },
  { src: `me = Engineer(\n    name=${q(DATA.name)},\n    role=${q(DATA.role)},\n    location=${q(DATA.location)},\n)\nme.about()`, out: outAbout },
  { id: 'skills', md: '<h2>Skills</h2>' },
  { src: `skills = load_skills("skills.yaml")\nskills.plot.barh(title="Projects using each skill")`, out: outSkills },
  { id: 'experience', md: '<h2>Experience</h2>' },
  { src: `experience = pd.read_csv("experience.csv")\nexperience`, out: outExp },
  { id: 'projects', md: '<h2>Projects</h2>' },
  { src: `projects = pd.read_csv("projects.csv")\nprojects.sort_values("year", ascending=False)`, out: outProjects },
  { id: 'contact', md: '<h2>Contact</h2>' },
  { src: `me.contact()  # or email ${DATA.contact.email}`, out: outContact }
];

const nb = $('#nb'), kern = $('#kern'), kst = $('#kst'), code = [];
let count = 0, busy = 0, epoch = 0;
CELLS.forEach(d => {
  const el = document.createElement('section');
  if (d.md) { el.className = 'cell md' + (d.cls ? ' ' + d.cls : ''); if (d.id) el.id = d.id; el.innerHTML = d.md; nb.appendChild(el); return; }
  el.className = 'cell code'; el.tabIndex = 0;
  el.innerHTML = `<div class="row"><span class="pr">In [ ]:</span><div class="sw"><pre class="src"><code>${hl(d.src)}</code></pre><button class="run" type="button" aria-label="Run cell">Run</button></div></div><div class="row" hidden><span class="pr po">Out[ ]:</span><div class="ob" aria-live="polite"></div></div>`;
  nb.appendChild(el);
  code.push({ d, el, pr: el.querySelector('.pr'), po: el.querySelector('.po'), outRow: el.lastElementChild, ob: el.querySelector('.ob') });
});

const kernel = () => { kst.textContent = 'Python 3 · ' + (busy ? 'busy' : 'idle'); kern.classList.toggle('busy', busy > 0); };
function run(c, fast) {
  return new Promise(res => {
    const my = epoch; busy++; kernel(); c.el.classList.add('running'); c.pr.textContent = 'In [*]:';
    setTimeout(() => {
      busy--; c.el.classList.remove('running');
      if (my !== epoch) { c.pr.textContent = 'In [ ]:'; kernel(); return res(); }
      const n = ++count; c.pr.textContent = `In [${n}]:`; c.po.textContent = `Out[${n}]:`;
      c.ob.innerHTML = c.d.out(); c.ob.classList.remove('rev'); void c.ob.offsetWidth; c.ob.classList.add('rev'); c.outRow.hidden = false; kernel();
      requestAnimationFrame(() => requestAnimationFrame(() => c.ob.querySelectorAll('.bt i').forEach(i => { i.style.width = i.dataset.w + '%'; })));
      res();
    }, fast ? 0 : 350 + Math.random() * 250);
  });
}
async function runAll() { const my = epoch; for (const c of code) { if (my !== epoch) return; await run(c, reduce); } }
function clearAll() {
  epoch++; count = 0;
  code.forEach(c => { c.outRow.hidden = true; c.ob.innerHTML = ''; c.pr.textContent = 'In [ ]:'; });
}

/* ---------- interactions ---------- */
$('#runAll').onclick = runAll;
$('#clear').onclick = clearAll;
nb.addEventListener('click', e => {
  const r = e.target.closest('.run'); if (r) return run(code.find(c => c.el.contains(r)));
  const t = e.target.closest('.tog');
  if (t) { const open = t.getAttribute('aria-expanded') !== 'true'; t.setAttribute('aria-expanded', open); document.getElementById(t.getAttribute('aria-controls')).hidden = !open; }
});
nb.addEventListener('keydown', e => {
  const i = code.findIndex(c => c.el === e.target);
  if (e.key === 'Enter' && e.shiftKey && i > -1) { e.preventDefault(); run(code[i]); if (code[i + 1]) code[i + 1].el.focus(); }
});
const tbtn = $('#theme');
function setTheme(t, save) {
  root.dataset.theme = t; if (window.netColors) netColors(); tbtn.textContent = t === 'dark' ? 'Light' : 'Dark'; tbtn.setAttribute('aria-pressed', t === 'dark');
  if (save) try { localStorage.setItem('nb-theme', t); } catch (e) {}
}
setTheme(root.dataset.theme || 'dark');
tbtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);

/* contact form (Web3Forms), delegated because the form is created when the cell runs */
document.addEventListener('submit', async e => {
  if (e.target.id !== 'form') return; e.preventDefault();
  const f = e.target, st = $('#status'); st.textContent = '';
  if (!f.checkValidity()) { st.textContent = 'Please add your name, a valid email, and a message.'; return; }
  if (f.access_key.value === 'YOUR_ACCESS_KEY') { st.textContent = 'Add your Web3Forms access key in script.js first.'; return; }
  try {
    const d = await (await fetch(f.action, { method: 'POST', body: new FormData(f) })).json();
    if (!d.success) throw new Error(d.message);
    st.textContent = 'Message sent. I will reply soon.'; f.reset();
  } catch (err) { st.textContent = 'Could not send. Please email me directly instead.'; }
});

/* ---------- skills graph hover, project card tilt, spotlight ---------- */
const hot = (svg, n) => { svg.classList.toggle('has', !!n); svg.querySelectorAll('.ln').forEach(l => l.classList.toggle('on', !!n && (l.dataset.s === n.dataset.n || l.dataset.p === n.dataset.n))); };
nb.addEventListener('mouseover', e => { const svg = e.target.closest('.gr'); if (svg) hot(svg, e.target.closest('.nd')); });
nb.addEventListener('mouseout', e => { const svg = e.target.closest('.gr'); if (svg && !svg.contains(e.relatedTarget)) hot(svg, null); });
nb.addEventListener('focusin', e => { const n = e.target.closest('.nd'); if (n) hot(n.closest('.gr'), n); });
nb.addEventListener('focusout', e => { const n = e.target.closest('.nd'); if (n) hot(n.closest('.gr'), null); });
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
if (fine && !reduce) {
  nb.addEventListener('pointermove', e => { const c = e.target.closest('.pc'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 10 + 'deg'); c.style.setProperty('--rx', (.5 - (e.clientY - r.top) / r.height) * 10 + 'deg'); });
  nb.addEventListener('pointerout', e => { const c = e.target.closest('.pc'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); } });
}
addEventListener('pointermove', e => { root.style.setProperty('--x', e.clientX + 'px'); root.style.setProperty('--y', e.clientY + 'px'); mx = e.clientX; my = e.clientY; });

/* ---------- background: drifting neural network that reacts to the cursor ---------- */
var cv = $('#net'), cx = cv.getContext('2d'), nodes = [], W, H, mx = -999, my = -999, cols = ['#22D3EE', '#A78BFA', '#F472B6'];
function netColors() { const g = k => getComputedStyle(root).getPropertyValue(k).trim(); cols = [g('--a1'), g('--a2'), g('--a3')]; (nodes || []).forEach((n, i) => n.c = cols[i % 3]); }
function sizeNet() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  nodes = Array.from({ length: Math.min(90, Math.floor(W * H / 17000)) }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, c: cols[i % 3] }));
}
function drawNet(move) {
  cx.clearRect(0, 0, W, H);
  nodes.forEach((a, i) => {
    if (move) { a.x = (a.x + a.vx + W) % W; a.y = (a.y + a.vy + H) % H; }
    cx.globalAlpha = .9; cx.fillStyle = a.c; cx.beginPath(); cx.arc(a.x, a.y, 1.9, 0, 6.3); cx.fill();
    for (let j = i + 1; j < nodes.length; j++) { const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 130) { cx.globalAlpha = (1 - d / 130) * .35; cx.strokeStyle = cols[1]; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); } }
    const dm = Math.hypot(a.x - mx, a.y - my); if (dm < 180) { cx.globalAlpha = (1 - dm / 180) * .7; cx.strokeStyle = cols[0]; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(mx, my); cx.stroke(); }
  });
}
netColors(); sizeNet(); addEventListener('resize', () => { sizeNet(); if (reduce) drawNet(false); });
if (reduce) drawNet(false); else (function loop() { drawNet(true); requestAnimationFrame(loop); })();

setTimeout(runAll, 350);
