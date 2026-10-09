# Portfolio Templates

Five free, responsive portfolio website templates built with plain HTML, CSS and JavaScript. No build step, no framework, no dependencies. Edit one data block, open `index.html`, and you have a portfolio.

Each template has the same five sections: **About, Skills, Experience, Projects, Contact**, but a very different look and feel.

## Live demos

Replace the screenshot placeholders with your own real screenshots.

| # | Template | Style | Demo |
|---|----------|-------|------|
| 1 | [Sidebar](template-1-sidebar/) | Clean sidebar layout, light and dark mode, typewriter hero | [Open](https://omkar210404.github.io/portfolio-templates/template-1-sidebar/) |
| 2 | [Terminal](template-2-terminal/) | Interactive command-line portfolio | [Open](https://omkar210404.github.io/portfolio-templates/template-2-terminal/) |
| 3 | [Bold](template-3-bold/) | Giant type, six colour themes including a dark one | [Open](https://omkar210404.github.io/portfolio-templates/template-3-bold/) |
| 4 | [Notebook](template-4-notebook/) | Looks and behaves like a Jupyter notebook | [Open](https://omkar210404.github.io/portfolio-templates/template-4-notebook/) |
| 5 | [Desktop](template-5-desktop/) | A desktop with draggable windows and a dock | [Open](https://omkar210404.github.io/portfolio-templates/template-5-desktop/) |

<!-- Add real screenshots here, for example: ![Template 1](screenshots/template-1.png) -->

## What each template does

1. **Sidebar:** fixed sidebar with navigation, a typewriter hero over a generated dot-grid background, a timeline, project cards, and light/dark mode that remembers the visitor's choice.
2. **Terminal:** visitors type commands (`help`, `about`, `skills`, `projects`, `experience`, `contact`). It has Tab completion, command history, four colour themes, quick-command buttons for phones, and a plain "Classic view" for people who just want to read.
3. **Bold:** an oversized name whose letters react to the cursor on desktop, a skills marquee, project rows with a floating preview, and six full colour themes the visitor can switch between.
4. **Notebook:** each section is a code cell that "runs" on load. Skills show as a graph linking each skill to the projects that use it, projects are cards with generated cover art, and a neural-network background reacts to the cursor.
5. **Desktop:** an operating-system style page. Open About, Skills, Experience, Projects and Contact from the dock or menu bar, drag, minimise and maximise windows, and pick one of four wallpapers.

## Quick start

```bash
git clone https://github.com/Omkar210404/portfolio-templates.git
cd portfolio-templates
```

Open any template's `index.html` in a browser. To serve it locally instead:

```bash
python -m http.server 8000
# then visit http://localhost:8000/template-3-bold/
```

## Customise a template

- **Templates 2 to 5:** all content lives in one `DATA` object at the top of `script.js` (name, about, skills, experience, projects, contact). Edit the text there. You do not need to touch the HTML or CSS.
- **Template 1:** edit the text directly in `index.html`. The typewriter phrases are the `words` list near the top of `script.js`.
- **Colours and themes:** Template 3 has a `THEMES` list and Template 5 has a `WALLS` list in `script.js`. Template 1 uses CSS variables at the top of `style.css`.
- **Placeholder text:** every template ships with neutral placeholder content ("Your Name", "Project One", `you@email.com`). Replace all of it with your own real details, and only list real experience and projects.

### Skill counts and graphs

In Templates 4 and 5, the numbers and graph links on skills are calculated from your projects' `tags`. Keep tag names the same as your skill names (case does not matter), or the counts will show zero.

## Contact form

The forms use [Web3Forms](https://web3forms.com), which is free and needs no server.

1. Get an access key at web3forms.com.
2. Replace `YOUR_ACCESS_KEY`: in `index.html` for Templates 1 and 3, and in `script.js` (`contact.accessKey`) for Templates 4 and 5. Template 2 has no form, only email and links.

Never commit a key you want to keep private. A Web3Forms key is designed to be used in public pages, but you can restrict it to your domain in their dashboard.

## Deploy for free with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. Your templates will be live at `https://<your-username>.github.io/portfolio-templates/template-1-sidebar/` and so on.

To use one as your own portfolio, copy that template's three files into a repo named `<your-username>.github.io`.

## Tech

- HTML, CSS and vanilla JavaScript only
- Google Fonts (loaded from the internet; each template falls back to a system font if offline)
- No frameworks, no build tools, no tracking
- Respects the `prefers-reduced-motion` setting, uses visible keyboard focus styles, and adapts to phones and tablets

## Known limitations

- Cursor effects (Templates 3, 4 and 5) are desktop-only and switch off on touch devices.
- Template 4's "Python kernel" and the CSV files in its code cells are a visual theme only. Nothing actually runs Python.
- Project cover images in Templates 3, 4 and 5 are generated artwork, not screenshots. Replace them with real screenshots of your work if you can.
- The templates have not been through a formal accessibility audit or testing on every browser and device.

## How these were made

Built with AI assistance (Claude by Anthropic), then reviewed and tested by me. If you reuse them, please test them on your own devices before publishing.

## License

[MIT](LICENSE) © 2026 Omkar Satish Nikam. Free to use, modify and share, including for your own portfolio.
