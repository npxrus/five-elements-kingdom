import type {
  ActConfig,
  LevelConfig,
  DialogueLine,
} from "../types/narrative.types";
import * as ActsData from "../data/acts";

/**
 * Синглтон-менеджер управления нарративом и сценарными данными.
 * Отвечает за загрузку актов, поиск уровней/диалогов и трекинг прогресса.
 */
export class NarrativeVanager {
  /** Кэш загруженных актов */
  private readonly acts: Map<string, ActConfig>;
  /** ID последнего успешно пройденного уровня */
  private currentLevelId: string;

  constructor() {
    this.acts = new Map();
    this.currentLevelId = "";
    this.init();
  }

  /**
   * Инициализирует менеджер: загружает все доступные акты из data-папки.
   * В будущем может подгружать данные асинхронно или через API.
   */
  private init(): void {
    Object.values(ActsData).forEach((actData: ActConfig) => {
      if (actData?.id) {
        this.acts.set(actData.id, actData);
      }
    });
    // По умолчанию начинаем с первого уровня пролога
    this.currentLevelId = this.acts.get("act_prologue")?.levels[0]?.id ?? "";
    console.log(
      `[NarrativeManager] Загружено актов: ${this.acts.size}. Старт: ${this.currentLevelId}`,
    );
  }

  /**
   * Возвращает конфигурацию уровня по его уникальному ID.
   * @param levelId - Идентификатор уровня.
   * @returns Конфигурация уровня или null, если не найдена.
   */
  public getLevelConfig(levelId: string): LevelConfig | null {
    for (const act of this.acts.values()) {
      const found = act.levels.find((l) => l.id === levelId);
      if (found) return found;
    }
    console.warn(
      `[NarrativeManager] Уровень "${levelId}" не найден в загруженных актах.`,
    );
    return null;
  }

  /**
   * Возвращает диалоги, привязанные к указанному триггеру уровня.
   * @param levelId - Идентификатор уровня.
   * @param actionType - Тип действия триггера (по умолчанию 'show_dialogue).
   * @returns Массив строк диалога.
   */
  public getDialoguesForTrigger(
    levelId: string,
    actionType: "show_dialogue" = "show_dialogue",
  ): DialogueLine[] {
    const level = this.getLevelConfig(levelId);
    if (!level) return [];

    return level.triggers
      .filter(
        (t) => t.action === actionType && t.dataRef.startsWith("dialogue"),
      )
      .map((t) => {
        return { speakerId: "system", textKey: t.dataRef, emotion: "neutral" };
      });
  }

  /**
   * Обновляет прогресс после прохождения уровня.
   * @param completedLevelId - Идентификатор пройденного уровня.
   */
  public completeLevel(completedLevelId: string): void {
    const config = this.getLevelConfig(completedLevelId);
    if (!config) return;

    this.currentLevelId = completedLevelId;
    console.log(
      `[NarrativeManager] Уровень "${completedLevelId}" пройден. Прогресс сохранён`,
    );
  }

  /**
   * Возвращает ID текущего уровня для загрузки.
   * @returns Строковый идентификатор уровня.
   */
  public getCurrentLevelId(): string {
    return this.currentLevelId;
  }

  /**
   * Возвращает список всех зарегистрированных актов (для меню выбора главы).
   * @returns Массив конфигураций актов.
   */
  public getAllActs(): ActConfig[] {
    return Array.from(this.acts.values());
  }
}

/**
 * Экспортируемый экземпляр синглтона для глобального доступа в сценах.
 */
export const Narrative = new NarrativeVanager();
