<p align="center">
  <img width="80" src="images/offense/equipments/fireball.webp" alt="COC Calculator Logo" />
</p>
<h1 align="center">COC Calculator</h1>
<h3 align="center">ZapQuake Damage Calculator for Clash of Clans</h3>

## Description

A standalone single-page calculator that computes how many Lightning and Earthquake spells are needed to destroy specific defenses in Clash of Clans, with support for hero equipment and donated spells.

**Features:**
- Select level for Lightning Spell and Earthquake Spell
- Support for donated Lightning Spells (from Clan Castle)
- Select level for hero equipment: Earthquake Boots, Spiky Ball, Giant Arrow, Fireball, Seeking Shield, Rocket Backpack
- **Giant Arrow deals 2× damage vs Air Defense** (June 2026 update)
- Earthquake order selector (spell first vs boots first)
- Real-time damage calculation across all defenses
- Search and filter defense list
- Set all to max/min level buttons
- Multi-language support (English & Indonesian)
- State saved automatically via localStorage

## Built With

- **JavaScript** — all calculation logic
- **Tailwind CSS v3** — styling via npm build
- **Inter** — UI font (Google Fonts)
- **HTML5** — single-page standalone app

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (for Tailwind CSS build)
- Any code editor or live server

### Setup

```bash
# Install dependencies
npm install

# Build CSS (one-time)
npm run build

# Watch CSS during development
npm run watch:css
```

Then open `index.html` via a local server (e.g. VS Code Live Server).

> **Note:** `fetch()` is used to load JSON data, so the file must be served via HTTP — not opened directly as a file.

## Usage

1. Set the level of your spells and equipment using the sliders
2. Optionally enable donated Lightning Spells and set the quantity
3. Choose the Earthquake order if using both Earthquake Boots and Earthquake Spell
4. Scroll down to the Defense List to see results in real-time
5. Use the search box to find a specific defense

All settings are saved automatically and restored on next visit.

## Changelog

### June 2026 Update
- **Giant Arrow** — Damage nerfed at levels 9 (1200→1100), 12 (1500→1200), 15 (1750→1350), 18 (2000→1500)
- **Giant Arrow** — Now deals **2× damage** specifically against Air Defense
- **Rocket Backpack** — Damage nerfed at level 21 (1925→1875), level 27 (2200→2150)

## Credits

- **[Kienlabadao](https://github.com/Kienlabadao/COC-Damage-Calculator)** — original project
- **[Clash of Clans Wiki](https://clashofclans.fandom.com/wiki/Clash_of_Clans_Wiki)** — data, images, and formulas
- **yusufalvian16** — UI rebuild (Tailwind CSS), multi-language support, Rocket Backpack equipment

## License

MIT License — see `LICENSE.md` for details.
