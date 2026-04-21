/**
 * Типизация элементов (стихий) мира Царства Пяти Начал.
 * Используется для привязки уровней, бонусов и визуальных тем.
 */
export type ElementType = "wood" | "fire" | "earth" | "metal" | "water";

/**
 * Ключ реплики диалога. В продакшене будет маппиться на i18n JSON.
 * На этапе прототипа используется как прямой идентификатор контента.
 */
export type DialogueKey = string;

/**
 * Интерфейс строки диалога.
 */
export interface DialogueLine {
  /** Идентификатор говорящей сущности или персонажа */
  speakerId: string;
  /** Ключ текста для локализации или прямой вывод */
  textKey: DialogueKey;
  /** Опциональная эмоция для анимации портрета/озвучки */
  emotion?: "neutral" | "happy" | "serious" | "whisper";
}

/**
 * Условие активации сценарного события.
 */
export type TriggerCondition =
  | "level_start"
  | "blocks_destroyed"
  | "boss_appear"
  | "player_lose_life"
  | "combo_reached";

/**
 * Действие, выполняемое при срабатывании триггера.
 */
export type TriggerAction =
  | "show_dialogue"
  | "play_cutscene"
  | "spawn_boss"
  | "unlock_ability"
  | "modify_physics";

/**
 * Конфигурация сценарного триггера внутри уровня.
 */
export interface EventTrigger {
  /** Условие, при котором триггер активируется */
  condition: TriggerCondition;
  /** Выполняемое действие */
  action: TriggerAction;
  /** Ссылка на данные (ключ диалога, ID босса, параметры модификатора) */
  dataRef: string;
  /** Дополнительные параметры (вес, приоритет, задержка) */
  params?: Record<string, number | string | boolean>;
}

/**
 * Конфигурация босса уровня.
 */
export interface BossConfig {
  /** Уникальный идентификатор босса */
  id: string;
  /** Ключ названия для локализации */
  nameKey: string;
  /** Базовое здоровье (в условных единицах ударов) */
  hp: number;
  /** Список ID паттернов атак */
  attackPatterns: string[];
  /** Уникальная механика арены (например, "invert_gravity") */
  arenaMechanic?: string;
}

/**
 * Конфигурация игрового уровня.
 */
export interface LevelConfig {
  /** Уникальный идентификатор уровня */
  id: string;
  /** ID акта, к которому принадлежит уровень */
  actId: string;
  /** Порядковый номер внутри акта */
  index: number;
  /** Основная стихия */
  primaryElement: ElementType;
  /** Ключ паттерна расстановки блоков */
  blockPattern: string;
  /** Список сценарных триггеров */
  triggers: EventTrigger[];
  /** Конфигурация босса (опционально) */
  boss?: BossConfig;
}

/**
 * Конфигурация акта (главы).
 */
export interface ActConfig {
  /** Уникальный идентификатор акта */
  id: string;
  /** Ключ названия акта */
  titleKey: string;
  /** Ключ описания/вступления */
  descriptionKey: string;
  /** Привязанная стихия главы */
  element: ElementType;
  /** Массив уровней акта */
  levels: LevelConfig[];
  /** Вступительные диалоги */
  introDialogue: DialogueLine[];
  /** Заключительные диалоги */
  outroDialogue: DialogueLine[];
}
