# Tallow — VS Code Theme

A dark VS Code color theme inspired by the Riverside Drive LTD brand. Warm, focused, and editorial — like writing code by candlelight.

## Color Palette

- **Base**: Dark charcoal `#1C1B18`
- **Primary Accent**: Amber-gold `#C49A1A`
- **Text**: Cream-white `#F4F1EA`
- **Strings**: Dusty ochre `#C4A876`
- **Comments**: Warm grey `#6A6560`
- **Active Line**: Lighter charcoal `#2A2824`

No blues, no purples — the entire palette stays within the warm dark spectrum.

## Installation

### Option 1: Manual Installation

1. Copy the `tallow-theme.json` file
2. Open VS Code Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type "Preferences: Open Settings (JSON)"
4. Add the following to your `settings.json`:

```json
{
  "workbench.colorCustomizations": {
    // Paste the "colors" section from tallow-theme.json here
  },
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      // Paste the "tokenColors" array from tallow-theme.json here
    ]
  }
}
```

### Option 2: As Custom Theme Extension

1. Create a folder: `~/.vscode/extensions/tallow-theme/`
2. Create `package.json`:

```json
{
  "name": "tallow-theme",
  "displayName": "Tallow",
  "version": "1.0.0",
  "publisher": "riverside-drive",
  "engines": {
    "vscode": "^1.60.0"
  },
  "categories": ["Themes"],
  "contributes": {
    "themes": [
      {
        "label": "Tallow",
        "uiTheme": "vs-dark",
        "path": "./themes/tallow-color-theme.json"
      }
    ]
  }
}
```

3. Create `themes/` folder and place `tallow-theme.json` as `tallow-color-theme.json`
4. Reload VS Code
5. Select theme: `Preferences: Color Theme` → "Tallow"

## Recommended Font Settings

For the full candlelight editorial experience:

```json
{
  "editor.fontFamily": "'Berkeley Mono', 'Operator Mono', 'Dank Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  "editor.fontSize": 14,
  "editor.lineHeight": 1.8,
  "editor.fontLigatures": true,
  "editor.letterSpacing": 0.2,
  "editor.cursorBlinking": "phase",
  "editor.cursorStyle": "line",
  "editor.cursorWidth": 2,
  "editor.renderWhitespace": "none",
  "editor.minimap.enabled": false,
  "workbench.statusBar.visible": true,
  "editor.scrollbar.vertical": "hidden",
  "editor.scrollbar.horizontal": "hidden",
  "editor.overviewRulerBorder": false
}
```

## Philosophy

Tallow is designed for long coding sessions in low-light environments. The warm color temperature reduces eye strain, while the muted palette keeps syntax highlighting informative without being distracting. The gold cursor and accents guide your focus without jarring contrast.

Perfect for:
- Late-night coding sessions
- Writers who code
- Anyone tired of blue-dominant themes
- Focused, distraction-free work

## Pairs Well With

- Dark wallpapers with warm tones
- f.lux / Night Shift enabled
- Ambient low lighting
- Coffee or whiskey (your choice)

---

**Riverside Drive LTD** — Amplified Growth
