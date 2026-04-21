import { Game, Types } from "phaser";
import { GAME_CONFIG } from "./config";
import { BootScene } from "./scenes/BootScene";

const LAUNCH_CONFIG: Types.Core.GameConfig = {
  ...GAME_CONFIG,
  scene: [BootScene],
};

export const game = new Game(LAUNCH_CONFIG);

console.log("[Main] Игровой движок запущен. Ожидание цикла update...");
