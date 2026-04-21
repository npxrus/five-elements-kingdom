import { Game, Types } from "phaser";
import { GAME_CONFIG } from "./config";
import { BootScene } from "./scenes/BootScene";
import { Narrative } from "./managers/NarrativeManager";

/** Расширенная конфигурация запуска */
const LAUNCH_CONFIG: Types.Core.GameConfig = {
  ...GAME_CONFIG,
  scene: [BootScene],
};

/** Точка входа в прложение */
export const game = new Game(LAUNCH_CONFIG);

// ✅ Валидация архитектуры нарратива
console.group("[Main] Тест NarrativeManager");
const testLevel = Narrative.getLevelConfig("lvl_p1");
console.log(
  "Загружен уровень: ",
  testLevel?.id,
  " | Стихия: ",
  testLevel?.primaryElement,
);
console.log("Триггеры: ", testLevel?.triggers);
console.log("Текущий прогресс: ", Narrative.getCurrentLevelId());
console.groupEnd;
