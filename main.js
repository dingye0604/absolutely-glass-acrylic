/* Local AbsolutelyGlass companion. No dependencies beyond Obsidian's Electron bridge.
 * Only manages the main window. Never changes global nativeTheme or system settings.
 */
const { Plugin, Notice } = require("obsidian");

module.exports = class AbsolutelyGlassAcrylic extends Plugin {
  onload() {
    this.stopped = false;
    this.active = false;
    this.failed = false;
    this.win = null;
    this.media = window.matchMedia("(prefers-reduced-transparency: reduce)");
    this.update = () => this.scheduleSync();
    this.observedState = this.bodyState();
    this.observer = new MutationObserver(() => {
      const state = this.bodyState();
      if (state === this.observedState) return;
      this.observedState = state;
      this.scheduleSync();
    });
    this.observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    this.register(() => this.observer.disconnect());
    this.media.addEventListener("change", this.update);
    this.register(() => this.media.removeEventListener("change", this.update));
    this.registerEvent(this.app.workspace.on("css-change", this.update));
    this.registerDomEvent(window, "focus", this.update);
    this.addCommand({
      id: "retry-acrylic", name: "重新应用 Acrylic 磨砂背景",
      callback: () => { this.failed = false; this.scheduleSync(); }
    });
    this.app.workspace.onLayoutReady(() => this.scheduleSync());
    this.register(() => clearTimeout(this.syncTimer));
  }

  bodyState() {
    // Ignore our own marker and unrelated hover/modal/plugin body classes.
    return ["theme-light", "theme-dark", "ca-solid"]
      .map(name => document.body.classList.contains(name) ? "1" : "0").join("");
  }

  scheduleSync() {
    if (this.stopped) return;
    clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => {
      this.syncTimer = null;
      this.sync();
    }, 160);
  }

  clearMarker() {
    // Even removing an absent token can enqueue a MutationObserver notification.
    if (document.body.classList.contains("ca-native-glass")) {
      document.body.classList.remove("ca-native-glass");
    }
  }

  sync() {
    if (this.stopped) return;
    const enabled = getComputedStyle(document.body)
      .getPropertyValue("--claudeapple-theme").trim() === "1";
    if (!enabled || document.body.classList.contains("ca-solid") || this.media.matches) {
      this.restore();
      return;
    }
    if (this.active || this.failed) return;
    let changed = false;
    try {
      if (process.platform !== "win32") throw new Error("仅支持 Windows 11 22H2 及以上");
      const build = Number(require("os").release().split(".")[2]);
      if (!Number.isFinite(build) || build < 22621) throw new Error("需要 Windows 11 22H2 及以上");
      let remote;
      try { remote = require("@electron/remote"); }
      catch (_) { remote = require("electron").remote; }
      if (!remote || typeof remote.getCurrentWindow !== "function") {
        throw new Error("此 Obsidian 安装程序未提供 Electron 窗口接口");
      }
      this.win = remote.getCurrentWindow();
      if (!this.win || typeof this.win.setBackgroundMaterial !== "function") {
        throw new Error("请升级 Obsidian 安装程序以获得 Acrylic 接口");
      }
      this.previousColor = this.win.getBackgroundColor();
      changed = true;
      this.win.setBackgroundColor("#00000000");
      this.win.setBackgroundMaterial("acrylic");
      this.active = true;
      document.body.classList.add("ca-native-glass");
    } catch (error) {
      if (changed) this.restoreWindow();
      this.active = false;
      this.failed = true;
      this.clearMarker();
      new Notice(`AbsolutelyGlass：原生磨砂未启用，已保留主题内玻璃效果。${error.message}`, 9000);
    }
  }

  restoreWindow() {
    if (!this.win || this.win.isDestroyed()) return;
    // Electron exposes no getter for the previous material. Return to its default.
    try { this.win.setBackgroundMaterial("auto"); } catch (_) { /* Older runtime. */ }
    try { this.win.setBackgroundColor(this.previousColor); } catch (_) { /* Window closing. */ }
  }

  restore() {
    if (this.active) this.restoreWindow();
    this.active = false;
    this.clearMarker();
  }

  onunload() {
    this.stopped = true;
    clearTimeout(this.syncTimer);
    if (this.observer) this.observer.disconnect();
    this.restore();
  }
};
