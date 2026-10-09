/* ============ EDIT YOUR CONTENT HERE ============ */
const DATA = {
  name: 'Your Name', role: 'AI/ML Engineer (Fresher)', location: 'City, Country',
  about: [
    'Write two or three sentences about what you build and what role you want. Be specific and honest.',
    'Add a second paragraph if you like: what you are learning now, or how you work.'
  ],
  skills: {
    Languages: ['Python', 'SQL', 'JavaScript'],
    'ML and data': ['scikit-learn', 'pandas', 'NumPy', 'Hugging Face'],
    Backend: ['FastAPI', 'Docker', 'REST APIs'],
    Tools: ['Git', 'GitHub', 'Streamlit']
  },
  projects: [
    { name: 'project-one', desc: 'What it does and who it is for.', tags: ['Python', 'FastAPI'], url: '#' },
    { name: 'project-two', desc: 'What it does and who it is for.', tags: ['scikit-learn', 'Streamlit'], url: '#' },
    { name: 'project-three', desc: 'What it does and who it is for.', tags: ['NLP', 'Transformers'], url: '#' }
  ],
  experience: [
    { when: '2026', what: 'Role or degree title', org: 'Company or university', note: 'One line on what you did. Only list real experience.' },
    { when: '2022', what: 'Education', org: 'University name', note: 'Degree and field.' }
  ],
  contact: { email: 'you@email.com', github: 'https://github.com/', linkedin: 'https://linkedin.com/in/' }
};
/* ================================================ */

const $ = s => document.querySelector(s), root = document.documentElement;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const link = (u, t) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`;
const screen = $('#screen'), input = $('#cmd');
const THEMES = ['amber', 'green', 'cyan', 'light'];

/* ---------- commands: each returns an HTML string ---------- */
const CMDS = {
  help: () => [['about', 'who I am'], ['skills', 'tools and languages'], ['projects', 'things I have built'],
    ['experience', 'timeline'], ['contact', 'get in touch'], ['theme <name>', THEMES.join(' | ')],
    ['classic', 'plain page view'], ['clear', 'clear the screen'], ['history', 'commands you ran']]
    .map(([c, d]) => `<span class="acc">${esc(c.padEnd(14))}</span>${esc(d)}`).join('\n') +
    '\n\n<span class="mute">Tip: Tab completes, ↑ ↓ browse history, Ctrl+L clears.</span>',
  about: () => DATA.about.map(esc).join('\n\n'),
  skills: () => Object.entries(DATA.skills).map(([k, v]) => `<b class="acc">${esc(k)}</b>\n  ${v.map(esc).join('   ')}`).join('\n\n'),
  projects: () => DATA.projects.map((p, i) => `<b class="acc">[${i + 1}] ${esc(p.name)}</b>\n    ${esc(p.desc)}\n    <span class="mute">stack:</span> ${p.tags.map(esc).join(', ')}\n    ${link(p.url, 'open project')}`).join('\n\n'),
  experience: () => DATA.experience.map(e => `<span class="ok">${esc(e.when)}</span>  <b>${esc(e.what)}</b>, ${esc(e.org)}\n      ${esc(e.note)}`).join('\n\n'),
  contact: () => `email     ${link('mailto:' + DATA.contact.email, DATA.contact.email)}\ngithub    ${link(DATA.contact.github, DATA.contact.github)}\nlinkedin  ${link(DATA.contact.linkedin, DATA.contact.linkedin)}`,
  whoami: () => `${esc(DATA.name)}\n${esc(DATA.role)}, ${esc(DATA.location)}`,
  ls: () => ['about', 'skills', 'projects', 'experience', 'contact'].map(f => `<span class="acc">${f}</span>`).join('   '),
  history: () => hist.length ? hist.map((h, i) => `${String(i + 1).padStart(3)}  ${esc(h)}`).join('\n') : '<span class="mute">no history yet</span>',
  sudo: a => /hire/i.test(a.join(' ')) ? `<span class="ok">Permission granted.</span> Email me: ${link('mailto:' + DATA.contact.email, DATA.contact.email)}` : 'sudo: nice try.',
  theme: a => {
    if (!THEMES.includes(a[0])) return `usage: theme &lt;${THEMES.join('|')}&gt;`;
    setTheme(a[0]); return `theme set to <span class="acc">${a[0]}</span>`;
  },
  clear: () => { screen.innerHTML = ''; return null; },
  classic: () => { toggleClassic(true); return null; }
};

/* ---------- terminal engine ---------- */
const hist = []; let hi = 0;
function print(html, cls = '') {
  const d = document.createElement('div'); d.className = 'out ' + cls; d.innerHTML = html;
  screen.appendChild(d); screen.scrollTop = screen.scrollHeight; return d;
}
function run(raw) {
  const text = raw.trim(); if (!text) return;
  hist.push(text); hi = hist.length;
  print(`<span class="ps">visitor@portfolio:~$</span>${esc(text)}`, 'echo');
  const [name, ...args] = text.split(/\s+/), fn = CMDS[name.toLowerCase()];
  if (!fn) return print(`command not found: ${esc(name)}. Type <span class="acc">help</span>.`);
  const out = fn(args); if (out) print(out);
}
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') { run(input.value); input.value = ''; }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) input.value = hist[--hi]; }
  else if (e.key === 'ArrowDown') { e.preventDefault(); input.value = ++hi < hist.length ? hist[hi] : (hi = hist.length, ''); }
  else if (e.key === 'Tab') {
    e.preventDefault(); const [w, a] = input.value.split(' ');
    if (a === undefined) { const m = Object.keys(CMDS).filter(c => c.startsWith(w.toLowerCase())); if (m.length === 1) input.value = m[0] + ' '; }
    else if (w === 'theme') { const m = THEMES.filter(t => t.startsWith(a)); if (m.length === 1) input.value = 'theme ' + m[0]; }
  } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); CMDS.clear(); }
});
screen.addEventListener('click', () => { if (!getSelection().toString()) input.focus(); });

/* quick-command chips (handy on phones) */
['help', 'about', 'skills', 'projects', 'experience', 'contact'].forEach(c => {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = c;
  b.onclick = () => { run(c); input.focus({ preventScroll: true }); }; $('#chips').appendChild(b);
});

/* ---------- theme ---------- */
function setTheme(t) {
  root.dataset.theme = t; $('#themeSel').value = t; rainColor();
  try { localStorage.setItem('term-theme', t); } catch (e) {}
}
$('#themeSel').onchange = e => setTheme(e.target.value);
try { const t = localStorage.getItem('term-theme'); if (THEMES.includes(t)) root.dataset.theme = t; } catch (e) {}
$('#themeSel').value = root.dataset.theme;

/* ---------- classic (plain) view for quick scanning ---------- */
function toggleClassic(on) {
  const c = $('#classic'); document.body.classList.toggle('classic', on); c.hidden = !on;
  if (on) {
    c.innerHTML = `<h1>${esc(DATA.name)}</h1><p class="sub">${esc(DATA.role)}, ${esc(DATA.location)}</p>` +
      ['about', 'skills', 'projects', 'experience', 'contact'].map(k => `<h2>${k[0].toUpperCase() + k.slice(1)}</h2><div class="out">${CMDS[k]()}</div>`).join('') +
      '<button class="back" type="button" id="backBtn">Back to terminal</button>';
    $('#backBtn').onclick = () => toggleClassic(false); window.scrollTo(0, 0);
  } else input.focus();
}
$('#classicBtn').onclick = () => toggleClassic(!document.body.classList.contains('classic'));

/* ---------- boot sequence ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function banner() {
  const t = ` ${DATA.name}  |  ${DATA.role} `, bar = '─'.repeat(t.length);
  print(`<span class="banner">┌${bar}┐\n│${esc(t)}│\n└${bar}┘</span>\n\nType <span class="acc">help</span> or tap a command below.`);
}
const BOOT = ['booting portfolio ...', '[ ok ] loading profile', '[ ok ] loading projects', '[ ok ] ready'];
let skipped = false, timers = [];
function finishBoot() { if (skipped && screen.dataset.booted) return; skipped = true; screen.dataset.booted = 1; timers.forEach(clearTimeout); screen.innerHTML = ''; banner(); input.focus(); }
function boot() {
  if (reduce) return finishBoot();
  BOOT.forEach((l, i) => timers.push(setTimeout(() => print(l.replace('[ ok ]', '<span class="ok">[ ok ]</span>'), 'mute'), i * 260)));
  timers.push(setTimeout(finishBoot, BOOT.length * 260 + 250));
  addEventListener('keydown', () => { if (!skipped) { skipped = true; finishBoot(); } }, { once: true });
}

/* ---------- background: faint falling characters ---------- */
const cv = $('#rain'), cx = cv.getContext('2d'), FS = 16, CH = '01{}[]<>/=+*#';
let drops = [], colr = '#fb4';
function rainColor() { colr = getComputedStyle(root).getPropertyValue('--acc').trim(); }
function size() { cv.width = innerWidth; cv.height = innerHeight; drops = Array.from({ length: Math.ceil(cv.width / FS) }, () => Math.random() * cv.height / FS); }
let last = 0;
function rain(t) {
  requestAnimationFrame(rain); if (t - last < 55) return; last = t;
  cx.globalCompositeOperation = 'destination-out'; cx.fillStyle = 'rgba(0,0,0,.14)'; cx.fillRect(0, 0, cv.width, cv.height);
  cx.globalCompositeOperation = 'source-over'; cx.fillStyle = colr; cx.font = FS + 'px monospace';
  drops.forEach((y, i) => {
    cx.fillText(CH[Math.random() * CH.length | 0], i * FS, y * FS);
    drops[i] = y * FS > cv.height && Math.random() > .975 ? 0 : y + 1;
  });
}
if (!reduce) { size(); rainColor(); addEventListener('resize', size); requestAnimationFrame(rain); } else cv.hidden = true;

boot();
