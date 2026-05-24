# Personal Site

A minimal, dark personal site for showcasing writing, projects, and resume.

## Project Structure

```
personal-site/
├── index.html          ← Main page (home, about, writing, projects, resume)
├── css/
│   └── style.css       ← All styles and design tokens
├── js/
│   └── main.js         ← Scroll effects and animations
├── pages/
│   └── writing-1.html  ← Article page template (duplicate for each essay)
└── assets/
    ├── hero.jpg         ← Your hero background image (add this yourself)
    └── resume.pdf       ← Your resume PDF (add this yourself)
```

## Getting Started

### 1. Customize index.html
Search for these placeholders and replace them:
- `Your Name` → your actual name
- `[Your Name]` → your name in the hero
- `[your interests here]` → what you're interested in
- `you@email.com` → your email
- Social media links (Twitter, GitHub, LinkedIn)
- Writing titles, dates, and links
- Project names, descriptions, and tags
- Resume experience entries

### 2. Add your hero image
Drop a photo into `assets/hero.jpg`. A dark, moody landscape or portrait works best.
The image fades in slowly on load — any good photo looks cinematic with this effect.

### 3. Add your resume PDF
Drop your resume into `assets/resume.pdf`.

### 4. Add writing pages
Duplicate `pages/writing-1.html` for each essay/article.
Update the filename and link from `index.html`.

### 5. Deploy to Vercel
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Click Deploy — done

### 6. Connect your Squarespace domain
In Vercel: Settings → Domains → Add your domain
Copy the A record and CNAME Vercel gives you.
In Squarespace: Domains → DNS Settings → paste those records.
Live in ~30 minutes.

## Customization Tips

- **Colors**: Edit the `:root` variables at the top of `style.css`
- **Fonts**: Change the Google Fonts import at the top of `style.css`
- **Hero text**: Edit the h1 and subtitle in `index.html`
- **Sections**: Add/remove/reorder sections in `index.html` as needed
