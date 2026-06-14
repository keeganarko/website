/* =============================================================
   site-nav  —  one nav bar shared across every page.
   Usage on any page:
     1) in <head>:   <script src="nav.js" defer></script>
     2) in <body>:   <site-nav></site-nav>   (as the first element)
   Edit links/labels/styles HERE ONLY and every page updates.
   Styles are encapsulated (shadow DOM), so they won't clash with
   or be affected by any page's CSS. The current page is detected
   automatically and highlighted.
   ============================================================= */
(function () {
  // ---- edit your menu here ----
  const LINKS = [
    { label: 'About',    href: 'about.html'    },
    { label: 'Writing',  href: 'blog.html'     },
    { label: 'Projects', href: 'projects.html' },
    { label: 'Resume',   href: 'resume.html'   },
  ];
  const LOGO = 'Keegan';
  const LOGO_HREF = 'index.html';
  const CTA = { label: 'Say hello', href: 'mailto:keeganarko@email.com' };
  // ------------------------------

  class SiteNav extends HTMLElement {
    connectedCallback() {
      // load nav fonts once at the document level
      if (!document.getElementById('site-nav-fonts')) {
        const f = document.createElement('link');
        f.id = 'site-nav-fonts';
        f.rel = 'stylesheet';
        f.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap';
        document.head.appendChild(f);
      }

      const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const isActive = (href) => href.toLowerCase() === here;

      const linksHTML = LINKS.map(l =>
        `<a href="${l.href}" class="lnk${isActive(l.href) ? ' active' : ''}"${isActive(l.href) ? ' aria-current="page"' : ''}>${l.label}</a>`
      ).join('');

      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
        <style>
          :host {
            position: sticky; top: 0; z-index: 100; display: block;
            --txt:    #4a4e57;
            --strong: #14161a;
            --pill:   rgba(255,255,255,.72);
            --border: rgba(20,22,26,.09);
            --shadow: 0 8px 30px rgba(20,22,26,.10);
            --hi:     rgba(20,22,26,.06);
            font-family: "Inter", system-ui, sans-serif;
          }
          .wrap { max-width: 1100px; margin: 0 auto; padding: 12px clamp(16px,4vw,40px); }
          .bar {
            display: flex; align-items: center; justify-content: space-between; gap: 14px;
            background: var(--pill);
            -webkit-backdrop-filter: blur(14px) saturate(140%);
            backdrop-filter: blur(14px) saturate(140%);
            border: 1px solid var(--border); border-radius: 16px;
            box-shadow: var(--shadow);
            padding: 9px 10px 9px 18px;
          }
          .logo {
            font-family: "Space Grotesk", system-ui, sans-serif;
            font-weight: 700; font-size: 1.12rem; letter-spacing: -.01em;
            color: var(--strong); text-decoration: none;
          }
          .links { display: flex; align-items: center; gap: 4px; }
          .lnk {
            color: var(--txt); text-decoration: none; font-size: .92rem; font-weight: 500;
            padding: 8px 13px; border-radius: 10px; transition: background .2s ease, color .2s ease;
          }
          .lnk:hover { color: var(--strong); background: var(--hi); }
          .lnk.active { color: var(--strong); background: var(--hi); }
          .cta {
            margin-left: 6px; padding: 9px 16px; border-radius: 10px;
            background: var(--strong); color: #fff; text-decoration: none;
            font-size: .9rem; font-weight: 600; transition: opacity .2s ease, transform .2s ease;
          }
          .cta:hover { opacity: .88; transform: translateY(-1px); }

          .toggle {
            display: none; width: 42px; height: 42px; border: 0; border-radius: 10px;
            background: transparent; cursor: pointer; align-items: center; justify-content: center;
          }
          .toggle span, .toggle span::before, .toggle span::after {
            content: ""; display: block; width: 20px; height: 2px; background: var(--strong);
            border-radius: 2px; transition: transform .25s ease, opacity .25s ease; position: relative;
          }
          .toggle span::before { position: absolute; top: -6px; }
          .toggle span::after  { position: absolute; top:  6px; }
          :host([open]) .toggle span { background: transparent; }
          :host([open]) .toggle span::before { transform: translateY(6px) rotate(45deg); }
          :host([open]) .toggle span::after  { transform: translateY(-6px) rotate(-45deg); }

          a:focus-visible, .toggle:focus-visible { outline: 2px solid var(--strong); outline-offset: 3px; }

          @media (max-width: 720px) {
            .toggle { display: inline-flex; }
            .links {
              position: absolute; left: clamp(16px,4vw,40px); right: clamp(16px,4vw,40px);
              top: calc(100% - 2px); flex-direction: column; align-items: stretch; gap: 2px;
              background: rgba(255,255,255,.92);
              -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
              border: 1px solid var(--border); border-radius: 14px; box-shadow: var(--shadow);
              padding: 8px; opacity: 0; transform: translateY(-8px); pointer-events: none;
              transition: opacity .2s ease, transform .2s ease;
            }
            :host([open]) .links { opacity: 1; transform: none; pointer-events: auto; }
            .lnk, .cta { padding: 12px 14px; }
            .cta { margin: 4px 0 0; text-align: center; }
          }
          @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
        </style>

        <div class="wrap">
          <nav class="bar" aria-label="Primary">
            <a class="logo" href="${LOGO_HREF}">${LOGO}</a>
            <button class="toggle" aria-label="Menu" aria-expanded="false"><span></span></button>
            <div class="links">
              ${linksHTML}
              <a class="cta" href="${CTA.href}">${CTA.label}</a>
            </div>
          </nav>
        </div>
      `;

      // mobile toggle
      const btn = root.querySelector('.toggle');
      btn.addEventListener('click', () => {
        const open = this.toggleAttribute('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // close menu after tapping a link
      root.querySelectorAll('.lnk, .cta').forEach(a =>
        a.addEventListener('click', () => {
          this.removeAttribute('open');
          btn.setAttribute('aria-expanded', 'false');
        })
      );
    }
  }

  customElements.define('site-nav', SiteNav);
})();
