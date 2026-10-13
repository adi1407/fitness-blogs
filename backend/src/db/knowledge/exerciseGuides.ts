import type { MuscleGroup } from "../../constants/knowledgeContent";
import type { ExerciseExpansion } from "./exerciseGuide";
import { CHEST_GUIDES } from "./exercisesChest";

export const EXERCISE_GUIDES: Partial<Record<MuscleGroup, Record<string, ExerciseExpansion>>> = {
  chest: CHEST_GUIDES,
};
