# 🍽️ SmartResto — Kitchen Management System

A clean, lightweight restaurant kitchen management app built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no fuss — just open the file and it works.

---

## What is this?

SmartResto is a front-end only kitchen management dashboard designed for small to mid-sized restaurants. It lets your team track live orders, manage tables, browse the full menu, and generate bills — all from a single browser tab.

It started as a personal project to practice UI design and vanilla JS, and grew into something actually usable. The light theme keeps things easy on the eyes during long shifts.

---

## Features

- **Login system** with two roles — Manager and Waiter
- **Dashboard** with live stats: total orders, pending, preparing, ready/served, revenue, and occupied tables
- **Live Orders view** with status filtering and table search
- **Order management** — create, edit, delete, and advance orders through the kitchen workflow (Pending → Preparing → Ready → Served)
- **Tables overview** — visual grid showing which tables are free or occupied, with live bill totals
- **Full menu browser** — organized by category with prices
- **Bill modal** — per-table itemized bill with subtotal, 10% tax, and a print option
- **Toast notifications** for every action
- **Responsive** — works on tablet and mobile too

---

## Getting Started

No install needed. Seriously.

1. Download or clone the repo
2. Make sure all three files are in the same folder:
   - `index.html`
   - `style.css`
   - `script.js`
3. Open `index.html` in any modern browser

That's it.

```bash
git clone https://github.com/your-username/smartresto.git
cd smartresto
# open index.html in your browser
```

---

## Login Credentials

The app ships with two demo accounts:

| Role    | Username | Password |
|---------|----------|----------|
| Manager | `admin`  | `admin123` |
| Waiter  | `waiter` | `1234`     |

> These are hardcoded in `script.js` under the `USERS` array — easy to change if you want to customize them.

---

## Project Structure

```
smartresto/
├── index.html    # All the markup and page structure
├── style.css     # Light theme, layout, components
└── script.js     # App logic, menu data, order state
```

Everything lives in three files. No dependencies, no node_modules, no config files to deal with.

---

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — all app logic, no libraries
- **Font Awesome 6** — icons
- **Google Fonts** — Cormorant Garamond + Outfit

---

## A Few Things to Know

- All data is stored in memory, so it resets on page refresh. There's no backend or localStorage — this is purely a front-end demo.
- The menu is defined as a plain object in `script.js`, so it's very easy to add or remove items.
- Tax rate is set to 10% and can be changed by editing the `TAX_RATE` constant at the top of `script.js`.
- The app supports up to 20 tables by default (`TABLE_COUNT` in `script.js`).

---

## Screenshots

> Coming soon — feel free to add your own!

---

## Contributing

If you want to improve something, go for it. Open an issue if you spot a bug or have an idea. PRs are welcome — just keep the zero-dependency philosophy intact.

---

## License

MIT — use it however you like.

---

*Built with too much coffee and a deep appreciation for clean restaurant UI.*
