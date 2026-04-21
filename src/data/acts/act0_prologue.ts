import type { ActConfig } from "../../types/narrative.types";

/**
 * Данные пролога: "Роща Мирового Дуба".
 * Вводит игрока в лор, обучает базовой механике отскока.
 */
export const ACT_PROLOGUE: ActConfig = {
  id: "act_prologue",
  titleKey: "act.prologue.title",
  descriptionKey: "act.prologue.desc",
  element: "wood",
  introDialogue: [
    {
      speakerId: "lunar_maiden",
      textKey: "dialogue.intro.maiden_1",
      emotion: "whisper",
    },
    {
      speakerId: "world_tree",
      textKey: "dialogue.intro.tree_1",
      emotion: "neutral",
    },
  ],
  outroDialogue: [
    {
      speakerId: "narrator",
      textKey: "dialogue.outro.narrator_1",
      emotion: "serious",
    },
  ],
  levels: [
    {
      id: "lvl_p1",
      actId: "act_prologue",
      index: 1,
      primaryElement: "wood",
      blockPattern: "tutorial_basic_1",
      triggers: [
        {
          condition: "level_start",
          action: "show_dialogue",
          dataRef: "dialogue.intro.mainden_1",
        },
      ],
    },
    {
      id: "lvl_p2",
      actId: "act_prologue",
      index: 2,
      primaryElement: "wood",
      blockPattern: "tutorial_basic_2",
      triggers: [
        {
          condition: "blocks_destroyed",
          action: "unlock_ability",
          dataRef: "wide_paddle",
          params: { duration: 10000 },
        },
      ],
    },
  ],
};
