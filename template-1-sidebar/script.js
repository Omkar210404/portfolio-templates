(() => {
  const $ = s => document.querySelector(s), root = document.documentElement;

  // Theme toggle (remembers choice)
  const tbtn = $('#theme');
  const setTheme = (t, save) => {
    root.dataset.theme = t;
    tbtn.setAttribute('aria-pressed', t === 'dark');
    tbtn.firstElementChild.textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
    if (save) try { localStorage.setItem('theme', t); } catch (e) {}
  };
  setTheme(root.dataset.theme || 'light');
  tbtn.onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);

  // Mobile menu
  const side = $('#side'), menu = $('#menu');
  const toggle = open => { side.classList.toggle('open', open); menu.setAttribute('aria-expanded', open); };
  menu.onclick = () => toggle(!side.classList.contains('open'));
  side.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  // Typewriter (edit the phrases; static if reduced motion is on)
  const words = ['machine learning apps', 'APIs with FastAPI', 'NLP tools', 'data dashboards'];
  const tw = $('#tw');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      c += del ? -1 : 1;
      tw.textContent = word.slice(0, c);
      let wait = del ? 40 : 85;
      if (!del && c === word.length) { del = true; wait = 1400; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  }

  // Highlight current section in the nav
  const links = [...side.querySelectorAll('nav a')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main > header, main > section').forEach(s => io.observe(s));

  // Contact form (Web3Forms)
  const form = $('#form'), status = $('#status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.className = ''; status.textContent = '';
    if (!form.checkValidity()) { status.className = 'err'; status.textContent = 'Please fill in your name, a valid email, and a message.'; return; }
    if (form.access_key.value === 'YOUR_ACCESS_KEY') { status.className = 'err'; status.textContent = 'Add your Web3Forms access key in index.html first.'; return; }
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      const d = await r.json();
      if (!d.success) throw new Error(d.message);
      status.className = 'ok'; status.textContent = 'Message sent. I will reply soon.'; form.reset();
    } catch (err) {
      status.className = 'err'; status.textContent = 'Could not send. Please email me directly instead.';
    }
  });

  $('#yr').textContent = new Date().getFullYear();
})();
