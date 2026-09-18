# CLaudeApple Glass

[English](./README.md) | **中文**

[CLaudeApple](https://github.com/dingye0604/CLaudeApple) 主题的可选配套插件。它向 Electron 申请原生 Windows Acrylic 材质，让真实桌面透过窗口，取代主题自己模拟的 CSS 玻璃。

不装这个插件，主题也照常工作——只是它在自己的背景上画磨砂面板。装了这个插件，桌面本身才成为背景。

## 系统要求

- **Windows 11 22H2（build 22621）或更高。** 插件会检查系统版本，低于此版本不会激活。
- **Obsidian 1.5.0 或更高**，且安装程序提供 `BrowserWindow.setBackgroundMaterial`。若安装程序的 Electron 版本较早，插件会给出提示并保持不动作。
- **已启用 CLaudeApple 主题。** 插件检测主题的标记变量，主题未激活时自动停用。

仅桌面端。插件标记为 `isDesktopOnly`，在 macOS、Linux、移动端不产生任何行为。

## 安装

### 从社区插件库

1. **设置 → 第三方插件 → 浏览**
2. 搜索 **CLaudeApple Glass**
3. **安装**，然后**启用**

### 手动安装

1. 从 [最新 release](https://github.com/dingye0604/claudeapple-glass/releases/latest) 下载 `main.js` 和 `manifest.json`
2. 在 `<你的库>/.obsidian/plugins/` 下新建文件夹 `claudeapple-glass`
3. 把两个文件放进去
4. 重启 Obsidian，在 **设置 → 第三方插件** 中启用 **CLaudeApple Glass**

无需任何配置，插件会自己识别主题。

## 它做什么

在当前窗口上设置两个属性——完全透明的背景色和 `acrylic` 材质——然后给文档 body 添加 `ca-native-glass` 类。主题响应该类，把自己的表面变透明，于是你看到的就是原生材质。

以下情况它会撤销全部改动：切换到其他主题、开启主题的不透明模式、系统启用「减少透明效果」辅助功能、或插件被卸载。

它只处理主窗口。弹出窗口保留主题的 CSS 玻璃效果，不获得原生材质。

## 它不做什么

- **不访问网络。完全没有。** 插件不发出任何 HTTP 请求，不加载远程资源，不发送遥测或使用数据。它做的全部事情都是本地的窗口操作。
- **不修改 Windows 设置。** 不碰系统主题、透明效果偏好或电源设置，只是向 Electron 申请某个窗口的材质。
- **不是 Apple 的 Liquid Glass。** Acrylic 是 Windows 合成器提供的材质，不含动态折射。
- **无法读取你现有的窗口材质。** Electron 没有提供对应的 getter。因此停用时，插件恢复它启用前记录的颜色，并把材质设回 `auto`。如果此前有别的插件设置过其他材质，那个材质不会被恢复。

不要与其他 Mica/Acrylic 窗口插件同时启用——它们会争抢同一个窗口属性。

### 源码

`main.js` 是单文件、约 120 行，除 Obsidian 自带的 Electron 桥（`obsidian`、`os`，以及 `@electron/remote` 或 `electron`）外无任何依赖。未压缩、未混淆。启用前你可以完整读一遍。

## 常见问题

**什么都没发生，也没有提示。** 多半是主题未激活，或系统低于 Windows 11 22H2。这些情况下插件按设计保持静默。

**提示材质不可用。** 你的 Obsidian 安装程序没有提供 Electron 的窗口材质接口，更新 Obsidian 通常可解决。期间主题的 CSS 玻璃效果不受影响。

**插件已启用但窗口仍是实色。** 是否真正启用 Acrylic 由 Windows 决定。检查 **设置 → 辅助功能 → 视觉效果 → 透明效果** 是否已打开。节能模式、远程桌面、部分显卡驱动回退同样会强制窗口变成实色。

**切换主题再切回来之后失效了。** 使用命令面板的 **CLaudeApple Glass: 重新应用 Acrylic 磨砂背景**。

**想要关掉。** 停用插件，或切换到任意其他主题，窗口会恢复到原背景色。

## 致谢

为 [CLaudeApple](https://github.com/dingye0604/CLaudeApple) 而做，该主题建立在 [ClaudeBaseline](https://github.com/dingye0604/ClaudeBaseline) 与 aaaa​alexis 的 [Baseline](https://github.com/aaaaalexis/obsidian-baseline) 之上。

这是独立的社区插件，**与 Anthropic 无隶属、赞助或背书关系**。「Claude」是 Anthropic PBC 的商标，此处仅用于描述本插件所配套的主题。

## 许可

[MIT](./LICENSE) © 2026 dingye0604
