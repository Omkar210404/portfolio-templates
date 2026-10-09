/* ============ EDIT YOUR CONTENT HERE ============ */
const DATA = {
  name: 'Your Name',
  tagline: 'AI/ML engineer building practical things with Python.',
  about: 'Write two or three sentences about what you build and what role you want. Mention real tools and real projects.',
  now: { Learning: 'Something you are studying', Building: 'Something you are making', Reading: 'Something you are reading' },
  skills: {
    Languages: ['Python', 'SQL', 'JavaScript'],
    'ML and data': ['scikit-learn', 'pandas', 'NumPy', 'Hugging Face'],
    Backend: ['FastAPI', 'Docker', 'REST APIs'],
    Tools: ['Git', 'GitHub', 'Streamlit', 'VS Code']
  },
  experience: [
    { when: '2026', what: 'Role or internship title', org: 'Company name', note: 'One or two lines on what you did and learned. Only list real experience.' },
    { when: '2025', what: 'Course, certification, or project', org: 'Organisation', note: 'One or two lines on what you did and learned.' },
    { when: '2022', what: 'B.E. Computer Engineering', org: 'University name', note: 'Degree, field, and anything worth noting.' }
  ],
  projects: [
    { name: 'Project One', year: '2026', desc: 'What it does, who it is for, and what you built.', tags: ['Python', 'FastAPI'], url: '#', hue: 230 },
    { name: 'Project Two', year: '2026', desc: 'What it does, who it is for, and what you built.', tags: ['scikit-learn', 'Streamlit'], url: '#', hue: 340 },
    { name: 'Project Three', year: '2025', desc: 'What it does, who it is for, and what you built.', tags: ['NLP', 'Transformers'], url: '#', hue: 150 }
  ],
  contact: { email: 'you@email.com', links: [['GitHub', 'https://github.com/'], ['LinkedIn', 'https://linkedin.com/in/']] }
};
/* Colour themes: hero = big top block, acc = highlight + footer, paper/ink = page, deep = dark bands, pop = hover/accents */
const THEMES = {
  Cobalt:   { hero: '#2A4BFF', acc: '#FFD60A', paper: '#F3F5FF', ink: '#0B1033', mute: '#4B5278', line: '#D3D9F2', deep: '#0B1033', onacc: '#0B1033', pop: '#2A4BFF' },
  Sunset:   { hero: '#E4441C', acc: '#FFD166', paper: '#FFF5EE', ink: '#2A0F08', mute: '#7A4A3C', line: '#F2D9CC', deep: '#2A0F08', onacc: '#2A0F08', pop: '#C93612' },
  Orchid:   { hero: '#6D3BFF', acc: '#5CF2B0', paper: '#F6F2FF', ink: '#1B0E40', mute: '#5E5280', line: '#DED4F7', deep: '#1B0E40', onacc: '#1B0E40', pop: '#6D3BFF' },
  Forest:   { hero: '#0F6B4F', acc: '#F6D55C', paper: '#F1F7F3', ink: '#0B2A20', mute: '#4E6B5F', line: '#D2E4DA', deep: '#0B2A20', onacc: '#0B2A20', pop: '#0F6B4F' },
  Rose:     { hero: '#D6246E', acc: '#FFE066', paper: '#FFF2F7', ink: '#3A0B22', mute: '#7D4A62', line: '#F4D3E1', deep: '#3A0B22', onacc: '#3A0B22', pop: '#D6246E' },
  Midnight: { hero: '#1C2760', acc: '#FFB703', paper: '#0A0E1F', ink: '#EDEFFC', mute: '#9AA3C7', line: '#232B4D', deep: '#050814', onacc: '#1A1200', pop: '#FFB703' }
};
/* ================================================ */

const $ = s => document.querySelector(s), root = document.documentElement;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------- render content ---------- */
let n = 0;
const nameEl = $('#name');
nameEl.setAttribute('aria-label', DATA.name);
nameEl.innerHTML = DATA.name.split(' ').map(w => `<span class="w" aria-hidden="true">${[...w].map(c => `<span class="l" style="--i:${n++}">${esc(c)}</span>`).join('')}</span>`).join('');
$('#logo').textContent = DATA.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
$('#tag').textContent = DATA.tagline;
const loop = Object.values(DATA.skills).flat().map(s => `<span>${esc(s)} ✦</span>`).join('');
$('#track').innerHTML = loop + loop;
$('#aboutText').textContent = DATA.about;
$('#now').innerHTML = Object.entries(DATA.now).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
$('#skillGrid').innerHTML = Object.entries(DATA.skills).map(([g, a]) => `<div class="sk"><h3>${esc(g)}</h3><ul class="chips">${a.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>`).join('');
$('#xp').innerHTML = DATA.experience.map(e => `<li><span class="yr">${esc(e.when)}</span><div><h3>${esc(e.what)}</h3><p class="org">${esc(e.org)}</p><p class="nt">${esc(e.note)}</p></div></li>`).join('');
$('#list').innerHTML = DATA.projects.map((p, i) => `<li><a class="row" href="${esc(p.url)}" data-i="${i}" target="_blank" rel="noopener"><span class="yr">${esc(p.year)}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p></div><span class="tg">${p.tags.map(esc).join(', ')}</span></a></li>`).join('');
const mail = $('#mail'); mail.textContent = DATA.contact.email; mail.href = 'mailto:' + DATA.contact.email;
$('#links').innerHTML = DATA.contact.links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join('');

/* ---------- colour themes (remembers choice) ---------- */
const sw = $('#sw');
function setTheme(name) {
  const t = THEMES[name]; if (!t) return;
  Object.entries(t).forEach(([k, v]) => root.style.setProperty('--' + k, v));
  sw.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === name));
  try { localStorage.setItem('bold-theme', name); } catch (e) {}
}
Object.entries(THEMES).forEach(([name, t]) => {
  const b = document.createElement('button'); b.type = 'button'; b.dataset.t = name;
  b.style.background = `linear-gradient(135deg,${t.hero} 50%,${t.acc} 50%)`;
  b.setAttribute('aria-label', name + ' theme'); b.title = name; b.onclick = () => setTheme(name); sw.appendChild(b);
});
let saved = 'Cobalt'; try { saved = localStorage.getItem('bold-theme') || saved; } catch (e) {}
setTheme(THEMES[saved] ? saved : 'Cobalt');

/* ---------- scroll progress, solid nav, active link ---------- */
const bar = $('#bar'), nav = $('#nav'), hero = $('#top');
let tick = false;
addEventListener('scroll', () => {
  if (tick) return; tick = true;
  requestAnimationFrame(() => {
    const h = document.documentElement;
    bar.style.width = (scrollY / (h.scrollHeight - innerHeight || 1) * 100) + '%';
    nav.classList.toggle('solid', scrollY > hero.offsetHeight - 80); tick = false;
  });
}, { passive: true });
const navLinks = [...document.querySelectorAll('.links a')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section, footer').forEach(s => io.observe(s));

/* ---------- copy email + contact form (Web3Forms) ---------- */
$('#copy').onclick = async () => {
  const msg = $('#copied');
  try { await navigator.clipboard.writeText(DATA.contact.email); msg.textContent = 'Email copied.'; }
  catch (e) { msg.textContent = 'Could not copy. Select the address and copy it.'; }
};
const form = $('#form'), status = $('#status');
form.addEventListener('submit', async e => {
  e.preventDefault(); status.textContent = '';
  if (!form.checkValidity()) { status.textContent = 'Please add your name, a valid email, and a message.'; return; }
  if (form.access_key.value === 'YOUR_ACCESS_KEY') { status.textContent = 'Add your Web3Forms access key in index.html first.'; return; }
  try {
    const d = await (await fetch(form.action, { method: 'POST', body: new FormData(form) })).json();
    if (!d.success) throw new Error(d.message);
    status.textContent = 'Message sent. I will reply soon.'; form.reset();
  } catch (err) { status.textContent = 'Could not send. Please email me directly instead.'; }
});

/* ---------- desktop-only effects ---------- */
if (fine && !reduce) {
  // 1. Letters in the hero lift and tilt toward the cursor
  const ls = [...document.querySelectorAll('.l')]; let pos = [];
  const measure = () => { pos = ls.map(l => { const r = l.getBoundingClientRect(); return { l, x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY, h: r.height }; }); };
  addEventListener('load', measure); addEventListener('resize', measure); document.fonts && document.fonts.ready.then(measure);
  hero.addEventListener('mousemove', e => pos.forEach(({ l, x, y, h }) => {
    const dx = e.pageX - x, dy = e.pageY - y, p = Math.max(0, 1 - Math.hypot(dx, dy) / 260);
    l.style.transform = p ? `translateY(${-p * .2 * h}px) rotate(${-p * 8 * Math.sign(dx || 1)}deg) scale(${1 + p * .1})` : '';
    l.style.color = p > .4 ? 'var(--acc)' : '';
  }));
  hero.addEventListener('mouseleave', () => ls.forEach(l => { l.style.transform = ''; l.style.color = ''; }));

  // 2. Project rows show a floating preview card
  const peek = $('#peek');
  document.querySelectorAll('.row').forEach(r => {
    const p = DATA.projects[r.dataset.i];
    r.addEventListener('mouseenter', () => {
      peek.style.background = `linear-gradient(135deg,hsl(${p.hue} 90% 55%),hsl(${(p.hue + 70) % 360} 85% 42%))`;
      peek.innerHTML = `<b>${esc(p.name.split(' ').map(w => w[0]).join('').slice(0, 3))}</b><span>${p.tags.map(esc).join('  ·  ')}</span>`;
      peek.classList.add('show');
    });
    r.addEventListener('mousemove', e => { peek.style.transform = `translate(${Math.min(e.clientX + 28, innerWidth - 300)}px,${Math.max(e.clientY - 95, 70)}px)`; });
    r.addEventListener('mouseleave', () => peek.classList.remove('show'));
  });

  // 3. Trailing cursor ring that grows over links and buttons
  const ring = $('#ring'); ring.style.display = 'block';
  let x = -50, y = -50, tx = -50, ty = -50, s = 1, big = false;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  document.addEventListener('mouseover', e => { big = !!e.target.closest('a,button'); });
  (function frame() {
    x += (tx - x) * .18; y += (ty - y) * .18; s += ((big ? 1.9 : 1) - s) * .2;
    ring.style.transform = `translate(${x}px,${y}px) scale(${s})`; requestAnimationFrame(frame);
  })();
}
