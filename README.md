# CLaudeApple Glass

**English** | [中文](./README.zh-CN.md)

An optional companion plugin for the [CLaudeApple](https://github.com/dingye0604/CLaudeApple) Obsidian theme. It asks Electron for a native Windows Acrylic backdrop so your real desktop shows through the window, instead of the theme's simulated CSS glass.

Without this plugin the theme still works everywhere — it just draws its own frosted panels over its own background. This plugin is what makes the desktop itself the backdrop.

## Requirements

- **Windows 11 22H2 (build 22621) or newer.** The plugin checks the OS build and stays inactive on anything older.
- **Obsidian 1.5.0 or newer**, installed with an Electron runtime that exposes `BrowserWindow.setBackgroundMaterial`. If your installer predates that API, the plugin tells you and does nothing.
- **The CLaudeApple theme**, enabled. The plugin looks for the theme's marker variable and disables itself when the theme is not active.

Desktop only. The plugin is `isDesktopOnly`, and it does nothing on macOS, Linux, or mobile.

## Installation

### From the community plugin browser

1. **Settings → Community plugins → Browse**
2. Search for **CLaudeApple Glass**
3. **Install**, then **Enable**

### Manually

1. Download `main.js` and `manifest.json` from the [latest release](https://github.com/dingye0604/claudeapple-glass/releases/latest)
2. Create a folder named `claudeapple-glass` inside `<your-vault>/.obsidian/plugins/`
3. Put both files in that folder
4. Reload Obsidian, then enable **CLaudeApple Glass** in **Settings → Community plugins**

Nothing to configure. The plugin finds the theme on its own.

## What it does

It sets two properties on the current window — a fully transparent background color and the `acrylic` material — then adds a `ca-native-glass` class to the document body. The theme responds to that class by making its own surfaces transparent, so the native material is what you see.

It reverses all of that when you switch away from the theme, switch on the theme's solid mode, turn on reduced-transparency accessibility settings, or unload the plugin.

It only ever touches the main window. Pop-out windows keep the theme's CSS glass and do not get a native material.

## What it does not do

- **No network access. None.** The plugin makes no HTTP requests, loads no remote resources, and sends no telemetry or usage data anywhere. Everything it does is local window manipulation.
- **It does not change Windows settings.** It does not touch your system theme, transparency preference, or power settings. It only asks Electron for a material on one window.
- **It is not Apple's Liquid Glass.** Acrylic is a Windows compositor material. There is no dynamic refraction.
- **It cannot read your existing window material.** Electron exposes no getter for it, so on disable the plugin restores the color it recorded before enabling and returns the material to `auto`. If another plugin had set a different material beforehand, that specific material is not restored.

Do not run this alongside another Mica or Acrylic window plugin — they will fight over the same window property.

### Source

`main.js` is a single file of 115 lines with no dependencies beyond Obsidian's own Electron bridge (`obsidian`, `os`, and `@electron/remote` or `electron`). It is not minified or obfuscated. You can read the whole thing before enabling it.

## Troubleshooting

**Nothing happens, no message.** The theme is probably not active, or you are on Windows 10 or an older Windows 11 build. The plugin stays silent in those cases by design.

**A notice says the material is unavailable.** Your Obsidian installer does not expose Electron's window material API. Updating Obsidian usually fixes it. The theme's CSS glass keeps working in the meantime.

**The window is opaque even though the plugin is active.** Windows decides whether to honor Acrylic. Check **Settings → Accessibility → Visual effects → Transparency effects** is on. Power saving, Remote Desktop, and some graphics driver fallbacks also force an opaque window.

**It stopped working after I switched themes and back.** Run **CLaudeApple Glass: Reapply Acrylic backdrop** from the command palette.

**You want it off.** Disable the plugin, or switch to any other theme. The window returns to its original background color.

## Credits

Made for [CLaudeApple](https://github.com/dingye0604/CLaudeApple), which is built on [ClaudeBaseline](https://github.com/dingye0604/ClaudeBaseline) and [Baseline](https://github.com/aaaaalexis/obsidian-baseline) by aaaa​alexis.

This is an independent, community-made plugin. It is **not affiliated with, sponsored by, or endorsed by Anthropic**. "Claude" is a trademark of Anthropic PBC, referenced here only to describe the theme this plugin accompanies.

## License

[MIT](./LICENSE) © 2026 dingye0604
