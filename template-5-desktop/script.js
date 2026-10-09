/* ============ EDIT YOUR CONTENT HERE ============ */
const DATA = {
  name: 'Your Name', role: 'AI/ML Engineer (Fresher)', location: 'City, Country',
  tagline: 'I build practical machine learning and API projects with Python.',
  about: [
    'Write two or three sentences about what you build and what role you want. Mention real tools and real projects.',
    'Add a second paragraph if you like: what you are learning now, or how you work.'
  ],
  now: { Learning: 'Something you are studying', Building: 'Something you are making', Reading: 'Something you are reading' },
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
  /* The number on each skill chip counts the projects that list it in `tags`, so keep tags matching skill names. */
  projects: [
    { name: 'Project One', year: '2026', desc: 'What it does, who it is for, and what you built.', tags: ['Python', 'FastAPI', 'Docker'], url: '#' },
    { name: 'Project Two', year: '2026', desc: 'What it does, who it is for, and what you built.', tags: ['Python', 'scikit-learn', 'pandas'], url: '#' },
    { name: 'Project Three', year: '2025', desc: 'What it does, who it is for, and what you built.', tags: ['Python', 'Transformers', 'Streamlit'], url: '#' }
  ],
  contact: { email: 'you@email.com', accessKey: 'YOUR_ACCESS_KEY', links: [['GitHub', 'https://github.com/'], ['LinkedIn', 'https://linkedin.com/in/']] }
};
const WALLS = [
  { n: 'Aurora', dark: 0, bg: 'radial-gradient(55% 50% at 12% 18%,#FFD3C2,transparent 70%),radial-gradient(50% 55% at 88% 12%,#BCD3FF,transparent 70%),radial-gradient(60% 60% at 75% 92%,#C4F4DC,transparent 70%),radial-gradient(50% 50% at 15% 90%,#E4CBFF,transparent 70%),#F7F3FF' },
  { n: 'Dusk', dark: 1, bg: 'radial-gradient(55% 50% at 15% 15%,#8E2F8A,transparent 70%),radial-gradient(50% 55% at 90% 20%,#2F3A8F,transparent 70%),radial-gradient(60% 60% at 70% 95%,#E5527C,transparent 70%),#120B24' },
  { n: 'Ocean', dark: 1, bg: 'radial-gradient(55% 55% at 20% 20%,#0F6E8C,transparent 70%),radial-gradient(60% 60% at 85% 85%,#1B4F9C,transparent 70%),radial-gradient(40% 40% at 80% 10%,#27B3A6,transparent 70%),#06121D' },
  { n: 'Meadow', dark: 0, bg: 'radial-gradient(55% 50% at 15% 20%,#D4F2B8,transparent 70%),radial-gradient(55% 55% at 85% 25%,#BFEFD8,transparent 70%),radial-gradient(60% 60% at 60% 95%,#F6EFB3,transparent 70%),#F2FAEC' }
];
/* ================================================ */

const $ = s => document.querySelector(s), root = document.documentElement;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uses = s => DATA.projects.filter(p => p.tags.some(t => t.toLowerCase() === s.toLowerCase())).length;
const init = DATA.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
const mobile = () => matchMedia('(max-width:720px)').matches;

/* ---------- generated project cover art ---------- */
function art(n, k) {
  let h = [...n].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7); const r = () => (h = (h * 1664525 + 1013904223) >>> 0) / 4294967296, hu = Math.floor(r() * 360);
  let s = `<svg viewBox="0 0 320 112" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="ag${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hu} 85% 58%)"/><stop offset="1" stop-color="hsl(${(hu + 70) % 360} 80% 32%)"/></linearGradient></defs><rect width="320" height="112" fill="url(#ag${k})"/>`;
  for (let i = 0; i < 4; i++) s += `<circle cx="${r() * 320 | 0}" cy="${r() * 112 | 0}" r="${18 + r() * 44 | 0}" fill="#fff" fill-opacity="${(.06 + r() * .12).toFixed(2)}"/>`;
  return s + `<text x="16" y="96" font-size="54" font-weight="800" fill="#fff" fill-opacity=".92" font-family="Figtree,sans-serif" letter-spacing="-2">${esc(n.split(' ').map(w => w[0]).join('').slice(0, 3))}</text></svg>`;
}

/* ---------- app contents ---------- */
const APPS = [
  { id: 'about', t: 'About', g: ['#FF8A65', '#FF5E8A'], w: 540, h: 440, ic: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    r: () => `<div class="ab"><div class="av">${esc(init)}</div><div><h2>${esc(DATA.name)}</h2><p class="mt">${esc(DATA.role)} · ${esc(DATA.location)}</p></div></div>${DATA.about.map(p => `<p>${esc(p)}</p>`).join('')}<dl class="now">${Object.entries(DATA.now).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` },
  { id: 'skills', t: 'Skills', g: ['#FFC857', '#FF9F43'], w: 560, h: 440, ic: '<path d="M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z"/>',
    r: () => Object.entries(DATA.skills).map(([g, a]) => `<h3>${esc(g)}</h3><ul class="chips">${a.map(s => `<li>${esc(s)}${uses(s) ? `<b>${uses(s)}</b>` : ''}</li>`).join('')}</ul>`).join('') + '<p class="cap" style="margin-top:20px">A number means how many of my projects use that skill.</p>' },
  { id: 'experience', t: 'Experience', g: ['#5EE6B0', '#18B97C'], w: 540, h: 440, ic: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
    r: () => `<ol class="tl">${DATA.experience.map(e => `<li><span class="yr">${esc(e.when)}</span><h3>${esc(e.role)}</h3><p class="org">${esc(e.org)}</p><p>${esc(e.note)}</p></li>`).join('')}</ol>` },
  { id: 'projects', t: 'Projects', g: ['#6C8CFF', '#8A5CFF'], w: 760, h: 500, ic: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    r: () => `<div class="pcs">${[...DATA.projects].sort((a, b) => b.year - a.year).map((p, i) => `<a class="pc" href="${esc(p.url)}" target="_blank" rel="noopener">${art(p.name, i)}<div class="pb"><span class="yr">${esc(p.year)}</span><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><ul class="chips">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></a>`).join('')}</div>` },
  { id: 'contact', t: 'Contact', g: ['#4FD1FF', '#2E8BFF'], w: 520, h: 540, ic: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    r: () => `<form class="fm" id="form" action="https://api.web3forms.com/submit" method="POST" novalidate>
<input type="hidden" name="access_key" value="${esc(DATA.contact.accessKey)}"><input type="hidden" name="from_name" value="Portfolio desktop">
<input type="checkbox" name="botcheck" class="bot" tabindex="-1" autocomplete="off" aria-hidden="true">
<label>Name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label>
<label>Message<textarea name="message" rows="4" required></textarea></label>
<button class="btn" type="submit">Send message</button><p class="st" id="status" role="status"></p></form>
<div class="lk"><a href="mailto:${esc(DATA.contact.email)}">${esc(DATA.contact.email)}</a><button class="btn o" type="button" id="copy">Copy email</button>${DATA.contact.links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join('')}</div>` }
];

/* ---------- header, widget, clock ---------- */
$('#brand').textContent = $('#hn').textContent = DATA.name;
$('#rl').textContent = `${DATA.role} · ${DATA.location}`; $('#tg').textContent = DATA.tagline;
const tick = () => { $('#clk').textContent = new Date().toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' }); };
tick(); setInterval(tick, 15000);

/* ---------- window manager ---------- */
let z = 10; const wins = {};
function focusWin(w) { w.el.style.zIndex = ++z; Object.values(wins).forEach(o => o.el.classList.toggle('on', o === w)); }
function sync(w) { const d = document.querySelector(`.dk[data-id="${w.a.id}"]`); d.toggleAttribute('data-run', w.run); }
function make(a, i) {
  const el = document.createElement('section'); el.className = 'win'; el.hidden = true;
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', a.t);
  el.innerHTML = `<div class="tbar"><span class="lights"><button class="c" type="button" aria-label="Close ${a.t}"></button><button class="m" type="button" aria-label="Minimise ${a.t}"></button><button class="x" type="button" aria-label="Maximise ${a.t}"></button></span><span class="tt">${a.t}</span></div><div class="wb">${a.r()}</div>`;
  const w = Math.min(a.w, innerWidth - 24), h = Math.min(a.h, innerHeight - 150);
  Object.assign(el.style, { width: w + 'px', height: h + 'px', left: Math.max(12, (innerWidth - w) / 2 + (i - 2) * 36) + 'px', top: Math.max(46, (innerHeight - h) / 2 - 24 + (i - 2) * 26) + 'px' });
  document.body.appendChild(el);
  const o = wins[a.id] = { a, el, run: false };
  el.addEventListener('pointerdown', () => focusWin(o));
  el.querySelector('.c').onclick = () => { el.hidden = true; o.run = false; sync(o); };
  el.querySelector('.m').onclick = () => { el.hidden = true; sync(o); };
  el.querySelector('.x').onclick = () => el.classList.toggle('max');
  const bar = el.querySelector('.tbar');
  bar.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || mobile() || el.classList.contains('max')) return;
    const r = el.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top; bar.setPointerCapture(e.pointerId);
    const mv = ev => { el.style.left = Math.min(Math.max(ev.clientX - dx, 80 - r.width), innerWidth - 80) + 'px'; el.style.top = Math.min(Math.max(ev.clientY - dy, 36), innerHeight - 70) + 'px'; };
    const up = () => { bar.removeEventListener('pointermove', mv); bar.removeEventListener('pointerup', up); };
    bar.addEventListener('pointermove', mv); bar.addEventListener('pointerup', up);
  });
  return o;
}
function openApp(id, toggle) {
  const o = wins[id];
  if (toggle && !o.el.hidden && o.el.classList.contains('on')) { o.el.hidden = true; return sync(o); }
  o.el.hidden = false; o.run = true; sync(o); focusWin(o);
}

/* ---------- dock, menu, wallpaper picker ---------- */
const dock = $('#dock'), menu = $('#menu'), pp = $('#pp');
const tile = (g, ic) => `<span class="ic" style="background:linear-gradient(135deg,${g[0]},${g[1]})"><svg viewBox="0 0 24 24" aria-hidden="true">${ic}</svg></span>`;
APPS.forEach((a, i) => {
  make(a, i);
  const d = document.createElement('button'); d.className = 'dk'; d.type = 'button'; d.dataset.id = a.id; d.dataset.l = a.t;
  d.setAttribute('aria-label', 'Open ' + a.t); d.innerHTML = tile(a.g, a.ic); d.onclick = () => openApp(a.id, true); dock.appendChild(d);
  const m = document.createElement('button'); m.type = 'button'; m.textContent = a.t; m.onclick = () => openApp(a.id); menu.appendChild(m);
});
const wb = document.createElement('button'); wb.className = 'dk'; wb.type = 'button'; wb.dataset.l = 'Wallpaper'; wb.setAttribute('aria-label', 'Choose wallpaper');
wb.innerHTML = tile(['#B7BEDB', '#6F7AA8'], '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/>'); dock.appendChild(wb);
wb.onclick = e => { e.stopPropagation(); pp.hidden = !pp.hidden; };
document.addEventListener('click', e => { if (!pp.contains(e.target)) pp.hidden = true; });

function setWall(i) {
  const w = WALLS[i]; $('#desk').style.background = w.bg; root.dataset.mode = w.dark ? 'dark' : 'light';
  pp.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', j === i));
  try { localStorage.setItem('os-wall', i); } catch (e) {}
}
WALLS.forEach((w, i) => { const b = document.createElement('button'); b.type = 'button'; b.innerHTML = `<i style="background:${w.bg}"></i>${w.n}`; b.onclick = () => { setWall(i); pp.hidden = true; }; pp.appendChild(b); });
let saved = 0; try { saved = +localStorage.getItem('os-wall') || 0; } catch (e) {}
setWall(WALLS[saved] ? saved : 0);

/* dock magnification (desktop pointers only) */
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  const items = [...dock.children], set = e => items.forEach(b => { const r = b.getBoundingClientRect(); b.style.setProperty('--s', e ? 1 + Math.max(0, 1 - Math.abs(e.clientX - r.left - r.width / 2) / 120) * .55 : 1); });
  dock.addEventListener('pointermove', set); dock.addEventListener('pointerleave', () => set(null));
}

/* ---------- keyboard, copy email, contact form ---------- */
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!pp.hidden) { pp.hidden = true; return; }
  const top = Object.values(wins).filter(o => !o.el.hidden).sort((a, b) => b.el.style.zIndex - a.el.style.zIndex)[0];
  if (top) { top.el.hidden = true; top.run = false; sync(top); }
});
document.addEventListener('click', async e => {
  if (e.target.id !== 'copy') return;
  try { await navigator.clipboard.writeText(DATA.contact.email); e.target.textContent = 'Copied'; } catch (err) { e.target.textContent = 'Copy failed'; }
  setTimeout(() => { e.target.textContent = 'Copy email'; }, 1800);
});
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

/* open About on desktop so the page never starts empty */
if (!mobile()) setTimeout(() => openApp('about'), 350);
