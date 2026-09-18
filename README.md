# AbsolutelyGlass Acrylic

**English** | [中文](./README.zh-CN.md)

Makes the [AbsolutelyGlass](https://github.com/dingye0604/AbsolutelyGlass) theme show your real desktop through the window, using Windows 11's built-in Acrylic material — the same frosted effect you see behind the Start menu.

The theme on its own blurs its own background. This plugin swaps that for the actual desktop sitting behind your window.

## Before you install

- **Windows 11 22H2 (build 22621) or newer.** On anything older the plugin quietly does nothing.
- **The AbsolutelyGlass theme, enabled.** The plugin only acts while that theme is active.
- **Obsidian 1.5.0 or newer**, installed with a recent Electron runtime.

Desktop only — it does nothing on macOS, Linux or mobile.

## Install

**From Obsidian** — Settings → Community plugins → Browse, search for **AbsolutelyGlass Acrylic**, then Install and Enable.

**By hand** — download `main.js` and `manifest.json` from the [latest release](https://github.com/dingye0604/absolutely-glass-acrylic/releases/latest), put both in `<your-vault>/.obsidian/plugins/absolutely-glass-acrylic/`, reload Obsidian, and enable it under Settings → Community plugins.

There is nothing to configure. The plugin finds the theme on its own.

## What it does

It makes one window's background transparent and asks Windows for the Acrylic material. Switch to another theme, turn on the theme's solid mode, or turn transparency off in Windows accessibility settings, and it puts everything back exactly as it was.

Pop-out windows keep the theme's own frosted panels; the plugin only handles the main window.

## What it doesn't do

- **No network access at all.** No requests, no remote resources, no usage data sent anywhere.
- **Doesn't change Windows settings.** Your system theme, transparency preference and power settings are left alone. It asks for a material on one window and does nothing else.
- **Isn't Apple's Liquid Glass.** Acrylic is Windows' own material. Nothing refracts or moves.
- **Can't restore a material it didn't set.** Electron offers no way to read the current one, so if another plugin had set something else, disabling this one returns your window to the Windows default rather than to that plugin's choice.

For that last reason, don't run it alongside another Mica or Acrylic window plugin.

## If something looks wrong

**Nothing happens and there's no message.** Either the theme isn't active, or your Windows is older than 11 22H2. The plugin stays silent in both cases by design.

**It says the material is unavailable.** Your Obsidian installer is too old to expose the API. Updating Obsidian usually fixes it; the theme's own frosted panels keep working meanwhile.

**The plugin is on but the window is still opaque.** Windows decides whether to honour Acrylic. Check **Settings → Accessibility → Visual effects → Transparency effects** is on — power saving, Remote Desktop and some graphics drivers also force it off.

**It stopped working after I switched themes and back.** Run **AbsolutelyGlass Acrylic: Reapply Acrylic backdrop** from the command palette.

**Turning it off.** Disable the plugin, or switch to any other theme. Your window goes back to how it was.

## Credits

Made for [AbsolutelyGlass](https://github.com/dingye0604/AbsolutelyGlass), which is built on [AbsolutelyBaseline](https://github.com/dingye0604/AbsolutelyBaseline) and [Baseline](https://github.com/aaaaalexis/obsidian-baseline) by aaaa​alexis.

An independent community plugin. It is **not affiliated with, sponsored by, or endorsed by Anthropic**. "Claude" is a trademark of Anthropic PBC, referenced here only to describe the theme this plugin accompanies.

## License

[MIT](./LICENSE) © 2026 dingye0604
