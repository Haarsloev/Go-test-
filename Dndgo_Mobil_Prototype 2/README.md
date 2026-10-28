# DNDGO — Prototype

A mobile-first, modular HTML/CSS/JavaScript RPG prototype based on `Prototype(1).md` only.

## Run
The project uses ES modules, so **do not open `main.html` directly via `file://`**.
Run a local web server from this directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/main.html` in a browser. To use real GPS on a phone, host it on **HTTPS** (e.g. GitHub Pages). GPS requires permission. Without permission, the map starts in demo mode around Aarhus.

## Included
- Local character selection/creation and autosave (`localStorage`)
- Fighter / Caster, levels 1–10, stat points, skills, talents, abilities and equipment
- OpenStreetMap/Leaflet map and GPS-based encounter placement (with demo fallback)
- 1-second turn-based combat, enemy retaliation, HP, charges, effects, XP and loot
- Hunting (three attempts), gathering, stone cutting, inventory and camp storage
- Player-placed camp on first visit; camp rest (20 seconds), ability preparation and recipe crafting
- Split modules for data, state, systems, screens and styling

## Known prototype limits and source ambiguities
- Real multiplayer is **not implemented**: the specification excludes player interaction and location synchronization and does not define a way to retrieve other players.
- Map encounters are generated around the last location when refreshed, rather than tracked continuously by step distance. GPS is opt-in.
- Combat is driven by one-second turns; Bleed ticks every 0.5 seconds without spending another action.
- Clarified rules from 27 October are applied: main skills start at 3 (three subskills at 1), cap 25; HP/AC +5 per level; XP uses skill formula; encounter stats scale additively; Wisdom does not change charges or hit chance. Some other unspecified values still use provisional defaults.
- Character visuals are emoji placeholders, not 3D animation.
- Camp crafting does not yet implement material processing, tools, cooking requirements for rest, or equipment repair.
- The 25-slot bag is a visual 5×5 representation; item quantities are not yet capped.
- Loot handling and death drop are simplified; the one-hour debuff is stored but has no gameplay penalty.
- Local data can be lost if browser site storage is cleared; it is not backed up.
