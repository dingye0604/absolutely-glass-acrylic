# AbsolutelyGlass Acrylic

[English](./README.md) | **中文**

让 [AbsolutelyGlass](https://github.com/dingye0604/AbsolutelyGlass) 主题把真实桌面透出来，用的是 Windows 11 自带的 Acrylic 材质——开始菜单背后那种磨砂效果。

主题本身模糊的是自己的背景。这个插件把它换成你窗口背后真正的桌面。

## 装之前先确认

- **Windows 11 22H2（build 22621）或更高。** 低于这个版本的系统上，插件会安静地什么都不做。
- **已启用 AbsolutelyGlass 主题。** 主题没激活时插件不动作。
- **Obsidian 1.5.0 或更高**，且安装程序较新。

仅桌面端——macOS、Linux 和移动端上它不产生任何行为。

## 安装

**在 Obsidian 里装**——设置 → 第三方插件 → 浏览，搜索 **AbsolutelyGlass Acrylic**，点「安装」再「启用」。

**手动装**——从[最新 release](https://github.com/dingye0604/absolutely-glass-acrylic/releases/latest) 下载 `main.js` 和 `manifest.json`，放进 `<你的库>/.obsidian/plugins/absolutely-glass-acrylic/`，重启 Obsidian，然后在设置 → 第三方插件里启用。

不需要任何配置，插件会自己识别主题。

## 它做什么

它把一个窗口的背景设为透明，并向 Windows 申请 Acrylic 材质。切换到其他主题、开启主题的不透明模式、或在 Windows 辅助功能里关掉透明效果时，它会原样恢复。

弹出窗口保留主题自带的磨砂面板，插件只管主窗口。

## 它不做什么

- **完全不访问网络。** 不发请求，不加载远程资源，不向任何地方发送使用数据。
- **不修改 Windows 设置。** 系统主题、透明效果偏好、电源设置一概不碰，只是给一个窗口申请材质。
- **不是 Apple 的 Liquid Glass。** Acrylic 是 Windows 自带的材质，没有折射，也不会流动。
- **无法恢复不是它设置的材质。** Electron 没有提供读取当前材质的接口，所以如果之前有别的插件设过其他材质，停用本插件会把窗口恢复到 Windows 默认值，而不是那个插件设的值。

正因为最后一条，不要和其他 Mica 或 Acrylic 窗口插件同时启用。

## 遇到问题

**什么都没发生，也没有提示。** 要么主题没激活，要么系统低于 Windows 11 22H2。这两种情况下插件都按设计保持静默。

**提示材质不可用。** 你的 Obsidian 安装程序太旧，没有提供该接口。更新 Obsidian 通常能解决；期间主题自带的磨砂面板照常可用。

**插件开着但窗口仍是实色。** 是否启用 Acrylic 由 Windows 决定。检查 **设置 → 辅助功能 → 视觉效果 → 透明效果** 是否打开——节能模式、远程桌面、部分显卡驱动也会让它失效。

**切换主题再切回来之后失效了。** 在命令面板运行 **AbsolutelyGlass Acrylic: Reapply Acrylic backdrop**。

**想关掉。** 停用插件，或切换到任意其他主题，窗口会恢复原状。

## 致谢

为 [AbsolutelyGlass](https://github.com/dingye0604/AbsolutelyGlass) 而做，该主题建立在 [AbsolutelyBaseline](https://github.com/dingye0604/AbsolutelyBaseline) 与 aaaa​alexis 的 [Baseline](https://github.com/aaaaalexis/obsidian-baseline) 之上。

独立的社区插件，**与 Anthropic 无隶属、赞助或背书关系**。「Claude」是 Anthropic PBC 的商标，此处仅用于描述本插件所配套的主题。

## 许可

[MIT](./LICENSE) © 2026 dingye0604
