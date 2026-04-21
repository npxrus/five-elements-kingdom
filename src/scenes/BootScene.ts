import { Scene, Types } from "phaser";

export class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  init(_data?: Record<string, any>): void {
    console.log(
      "[BootScene] Инициализация окружения. Проверка типов и движка...",
    );
  }

  create(): void {
    console.log("[BootScene] Сцена успешно создана. Рендеринг активен.");

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add
      .text(centerX, centerY, "Phaser 4 + Vite 8 + TS\nReady!", {
        fontFamily: "monospace",
        fontSize: "42px",
        color: "#00ff88",
        align: "center",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setShadow(2, 2, "#000000", 5);
  }
}
